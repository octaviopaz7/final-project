const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MongoAdapter = require("@bot-whatsapp/database/mongo");
const axios = require("axios").default;
const moment = require("moment");

const MONGO_DB_URI = "mongodb://0.0.0.0:27017";
const MONGO_DB_NAME = "db_bot";

// Funciones para manejar las API de turnos
const cancelarTurno = async (numeroCelular) => {
  try {
    const respuesta = await axios.put(
      `http://localhost:5000/api/appointments/phone/${numeroCelular}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return respuesta.data;
  } catch (error) {
    console.error("Error al cancelar el turno:", error);
    return null;
  }
};

const verificarTurno = async (numeroCelular, fecha) => {
  try {
    const respuesta = await axios.get(
      `http://localhost:5000/api/appointments/phone/${numeroCelular}`
    );
    if (respuesta.status === 200 && Array.isArray(respuesta.data)) {
      const turnos = respuesta.data;
      const turnoEnElMes = turnos.find((turno) => moment(turno.date, "DD/MM").isSame(fecha, "month"));
      return turnoEnElMes || null;
    }
    return null;
  } catch (error) {
    console.error("Error al verificar el turno:", error);
    return null;
  }
};

// Flow para cancelar turno
const flowCancelarTurno = addKeyword("###CANCELAR_TURNO###")
  .addAnswer(
    "Verificando si tienes un turno programado...",
    async (ctx, { flowDynamic, endFlow, globalState }) => {
      const turno = await verificarTurno(ctx.from);
      if (turno === null) {
        return endFlow("No se encontró ningún turno pendiente a tu nombre.");
      }
      if (turno && turno.status === "Pendiente") {
        globalState.update({
          nombre: turno.name,
          fecha: turno.date,
          horario: turno.hour,
        });
        return await flowDynamic([
          `Tienes un turno para el día ${turno.date}, en el horario ${turno.hour}.`,
          "¿Seguro que quieres cancelarlo? Responde *Si* o *No*.",
        ]);
      } else {
        return endFlow("No se encontró ningún turno pendiente a tu nombre.");
      }
    }
  )
  .addAnswer(
    "¿Seguro que quieres cancelarlo? *Si* o *No*",
    { capture: true },
    async (ctx, { flowDynamic, globalState, fallBack, endFlow }) => {
      if (ctx.body.toLowerCase() === "si") {
        try {
          await cancelarTurno(ctx.from);
          await flowDynamic("Tu turno ha sido cancelado!");
        } catch (error) {
          console.error("Error al cancelar el turno:", error);
          await flowDynamic("Hubo un problema al cancelar el turno. Inténtalo nuevamente.");
        }
        return endFlow();
      } else if (ctx.body.toLowerCase() === "no") {
        return endFlow(`Tu turno sigue activo. Te esperamos el día ${globalState.getMyState().fecha} a las ${globalState.getMyState().horario}.`);
      } else {
        return fallBack("Ingresaste una opción incorrecta. Responde *Si* o *No*.");
      }
    }
  );

// Flow para verificar turno
const flowVerificarTurno = addKeyword("###VERIFICAR_TURNO###")
  .addAnswer(
    "Verificando si posees un turno...",
    { delay: 3000 },
    async (ctx, { flowDynamic }) => {
      const turno = await verificarTurno(ctx.from);
      if (turno && turno.status === "Pendiente") {
        return await flowDynamic(
          `Tienes un turno para el día ${turno.date}, en el horario ${turno.hour}.`
        );
      } else if (turno === null) {
        return await flowDynamic("No posees un turno actualmente.");
      } else {
        return await flowDynamic("No tienes registrado un turno aún.");
      }
    }
  );

// Flow para solicitar un turno
const flowSolicitarTurno = addKeyword("###SOLICITAR_TURNO###")
  .addAnswer("👤 *Ingresa tu nombre y apellido:*", { capture: true }, async (ctx, { flowDynamic, globalState }) => {
    await globalState.update({ nombre: ctx.body });
  })
  .addAnswer("Gracias, ahora selecciona el tipo de consulta.\nOpciones:\n🦷 Limpieza\n🩺 Consulta\n🔄 Otro\n💉 Tratamiento", { capture: true }, async (ctx, { globalState, flowDynamic, fallBack }) => {
    const tipoConsulta = ctx.body.trim().toLowerCase();
    const tiposValidos = ["limpieza", "consulta", "otro", "tratamiento"];
    if (!tiposValidos.includes(tipoConsulta)) {
      return fallBack("❌ Tipo de consulta no válido. Por favor ingresa uno de los siguientes:\n🦷 Limpieza\n🩺 Consulta\n🔄 Otro\n💉 Tratamiento.");
    }
    await globalState.update({ tipoConsulta });
  })
  .addAnswer("Por favor, ingresa la fecha seleccionada (formato: DD/MM).", { capture: true }, async (ctx, { globalState, flowDynamic, fallBack }) => {
    const fechaSeleccionada = ctx.body.trim();
    const fechaValida = moment(fechaSeleccionada, "DD/MM", true).isValid();
    if (!fechaValida) {
      return fallBack("❌ La fecha ingresada no es válida. Por favor ingresa una fecha en formato DD/MM.");
    }

    // Verificar si ya existe un turno en el mes
    const turnoExistente = await verificarTurno(ctx.from, fechaSeleccionada);
    if (turnoExistente) {
      return fallBack(`❌ Ya tienes un turno programado en el mes de ${moment(fechaSeleccionada, "DD/MM").format("MMMM")}.`);
    }

    await globalState.update({ fecha: fechaSeleccionada });
    await mostrarHorariosDisponibles(ctx, globalState, flowDynamic); // Muestra los horarios después de validar la fecha
  })
  .addAnswer("Ingresa el horario seleccionado HH:MM", { capture: true }, async (ctx, { globalState, flowDynamic, fallBack }) => {
    const horarioSeleccionado = ctx.body.trim();
    const partesHorario = horarioSeleccionado.split(":");
    if (partesHorario.length !== 2) {
      return fallBack("❌ El formato del horario ingresado no es válido. Debe ser HH:MM.");
    }
    const horas = parseInt(partesHorario[0], 10);
    const minutos = parseInt(partesHorario[1], 10);
    if (isNaN(horas) || horas < 9 || horas > 17 || isNaN(minutos) || minutos % 30 !== 0 || minutos < 0 || minutos > 59) {
      return fallBack("❌ El horario ingresado no es válido. Debe estar entre las 09:00 y las 17:30 con intervalos de 30 minutos.");
    }
    const horario = `${horas}:${minutos < 10 ? '0' + minutos : minutos}`;
    const turnosOcupados = globalState.getMyState().turnosOcupados || [];
    if (turnosOcupados.includes(horario)) {
      await flowDynamic("❌ El horario seleccionado no está disponible, por favor elige otro.");
      return await mostrarHorariosDisponibles(ctx, globalState, flowDynamic); // Permitir ingresar otro horario
    }
    await globalState.update({ horario });
    await flowDynamic([
      `Tu turno es para el día *${globalState.getMyState().fecha}* a las *${globalState.getMyState().horario}*`,
      "Por favor, ingresa *Si* para confirmar el turno o *No* para cancelarlo.",
    ]);
  })
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, globalState, fallBack, endFlow }) => {
      const turno = {
        name: globalState.getMyState().nombre,
        phone: ctx.from,  // Número de teléfono ahora correcto
        date: globalState.getMyState().fecha,
        hour: globalState.getMyState().horario,
        tipoConsulta: globalState.getMyState().tipoConsulta,
      };

      if (ctx.body.toLowerCase() === "si") {
        try {
          const turnosOcupados = globalState.getMyState().turnosOcupados || [];
          turnosOcupados.push(turno.hour);
          await globalState.update({ turnosOcupados });
          await axios.post("http://localhost:5000/api/appointments", turno, {
            withCredentials: true,
          });

          await flowDynamic([
            "🎉 ¡Tu turno ha sido confirmado!",
            `🗓️ Te esperamos el día ${globalState.getMyState().fecha} a las ${globalState.getMyState().horario}.`,
            `💬 Tipo de consulta: ${globalState.getMyState().tipoConsulta}`,
            "Si necesitas algo más, solo escribe *hola* para volver a hablar con el bot.",
          ]);
        } catch (error) {
          console.error("Error al confirmar el turno:", error);
          return await flowDynamic("🚨 Hubo un problema al confirmar tu turno. Inténtalo de nuevo más tarde.");
        }
      } else if (ctx.body.toLowerCase() === "no") {
        return endFlow("❌ El turno ha sido cancelado.");
      } else {
        return fallBack("❌ Opción incorrecta. Por favor ingresa *si* o *no*.");
      }
    }
  );

// Función para mostrar los horarios disponibles
const mostrarHorariosDisponibles = async (ctx, globalState, flowDynamic) => {
  const horariosDisponibles = [];

  for (let h = 9; h <= 17; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (!(h === 17 && m > 30)) {
        horariosDisponibles.push(`${h}:${m < 10 ? '0' + m : m}`);
      }
    }
  }

  const horariosOcupados = globalState.getMyState().turnosOcupados || [];
  const horariosLibres = horariosDisponibles.filter(horario => !horariosOcupados.includes(horario));

  if (horariosLibres.length === 0) {
    await flowDynamic("Lo siento, no hay horarios disponibles para el día seleccionado.");
    return;
  }

  let horariosTexto = '';
  for (let i = 0; i < horariosLibres.length; i++) {
    horariosTexto += `- ${horariosLibres[i]}  `;
    if ((i + 1) % 5 === 0) {
      horariosTexto += "\n";
    }
  }

  await flowDynamic(`🕐 Horarios disponibles para el día ${globalState.getMyState().fecha}:\n${horariosTexto}`);
};

// Flow inicial de bienvenida
const flowDefault = addKeyword(EVENTS.WELCOME).addAnswer(
  [
    "Bienvenido a la Clínica Odontológica 🦷 te detallo a continuación las opciones!",
    "1-Solicitar turno 📅",
    "2-Verificar turno ✔",
    "3-Cancelar Turno ❌",
  ],
  { capture: true },
  async (ctx, { fallBack, gotoFlow, globalState }) => {
    const nombre = ctx.pushName;
    await globalState.update({ nombre: nombre });

    if (!["1", "2", "3"].includes(ctx.body)) {
      return fallBack("Ingresaste una opción incorrecta, intenta nuevamente.");
    }
    if (ctx.body === "1") {
      return gotoFlow(flowSolicitarTurno);
    }
    if (ctx.body === "2") {
      return gotoFlow(flowVerificarTurno);
    }
    if (ctx.body === "3") {
      return gotoFlow(flowCancelarTurno);
    }
  }
);

// Función principal
const main = async () => {
  const adapterDB = new MongoAdapter({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
  });
  const adapterFlow = createFlow([
    flowDefault,
    flowSolicitarTurno,
    flowVerificarTurno,
    flowCancelarTurno,
  ]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
    globalState: {
      nombre: "",
      fecha: "",
      horario: "",
      phone: "",
      tipoConsulta: "",  // Inicializar tipoConsulta en el estado global
      turnosOcupados: [],
    },
  });
  QRPortalWeb();
};

main();
