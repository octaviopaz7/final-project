const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
  addAnswer,
} = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MongoAdapter = require("@bot-whatsapp/database/mongo");
const axios = require("axios").default;
const moment = require("moment");
const {
  delay,
  makeCacheableSignalKeyStore,
} = require("@whiskeysockets/baileys");

const MONGO_DB_URI = "mongodb://0.0.0.0:27017";
const MONGO_DB_NAME = "db_bot";

const cancelarCitaEspecifica = async (idTurno) => {
  try {
    const respuesta = await axios.put(
      `http://localhost:5000/api/appointments/${idTurno}/status`,
      { status: "Cancelado" }
    );
    if (respuesta.status === 200) {
      if (Array.isArray(respuesta.data)) {
        return respuesta.data;
      } else {
        return [respuesta.data];
      }
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al verificar el turno:", error);
    return [];
  }
};

const obtenerTurnosPorTelefono = async (numeroCelular) => {
  try {
    const respuesta = await axios.get(
      `http://localhost:5000/api/appointments/phone/${numeroCelular}`
    );
    if (respuesta.status === 200) {
      if (Array.isArray(respuesta.data)) {
        return respuesta.data;
      } else {
        return [respuesta.data];
      }
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al verificar el turno:", error);
    return [];
  }
};

const verificarTurno = async (numeroCelular) => {
  try {
    const respuesta = await axios.get(
      `http://localhost:5000/api/appointments/phone/${numeroCelular}`
    );
    if (respuesta.status === 200) {
      if (Array.isArray(respuesta.data)) {
        return respuesta.data;
      } else {
        return [respuesta.data];
      }
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al verificar el turno:", error);
    return [];
  }
};

//Función para obtener turnos de un día en especifico.
const verificarTurnos = async (fecha) => {
  const fechaCodificada = encodeURIComponent(fecha);
  try {
    const respuesta = await axios.get(
      `http://localhost:5000/api/appointments/check-date/${fechaCodificada}`
    );
    if (respuesta.status === 200) {
      if (Array.isArray(respuesta.data)) {
        return respuesta.data;
      } else {
        return [respuesta.data];
      }
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al verificar turno con fecha;", error);
  }
};
const flowCancelarTurno = addKeyword("###CANCELAR_TURNO###").addAction(
  async (ctx, { flowDynamic, state, gotoFlow }) => {
    await state.update({ turnos: [] });
    await flowDynamic("_Verificando si poses turnos.._");
    const respuesta = await obtenerTurnosPorTelefono(ctx.from);
    if (respuesta.length == 0) {
      await flowDynamic(
        "No posees turnos para cancelar",
        "Saliendo a menú principal..."
      );
    } else {
      console.log(respuesta.map((turno) => turno.status));
      const idTurnos = respuesta
        .filter(
          (turno) =>
            turno.status === "Pendiente" || turno.status === "Confirmado"
        )
        .map((turno) => turno._id);
      console.log(idTurnos);
      await state.update({ turnos: idTurnos });
      if (idTurnos.length === 0) {
        return await flowDynamic(
          "No tienes turnos por cancelar... Saliendo a menu principal."
        );
      } else {
        await flowDynamic(
          `Estos son los turnos, posibles a cancelar.\n` +
            respuesta
              .filter(
                (turno) =>
                  turno.status === "Pendiente" || turno.status === "Confirmado"
              )
              .map(
                (turno, index) =>
                  `➡ ${index + 1} - ${turno.date} - ${turno.hour}, Tipo : ${
                    turno.appointmentType
                  } Estado : ${turno.status}.`
              )
              .join("\n")
        );
        return gotoFlow(usuarioConTurnosCancelables);
      }
    }
  }
);

const usuarioConTurnosCancelables = addKeyword("###TEST####").addAnswer(
  "De la lista anterior, por favor selecciona una opción. Por ejemplo 1",
  { capture: true },
  async (ctx, { flowDynamic, state, fallBack }) => {
    const idTurnos = state.get("turnos");
    console.log(idTurnos.length);
    const turnoElegido = ctx.body.trim();
    console.log(turnoElegido);
    if (!/^\d+$/.test(turnoElegido)) {
      // Verifica si no es un número entero positivo
      return fallBack(
        "Ingresaste una opción inválida. Por favor, ingresa un número."
      );
    }
    const opcionNumerica = parseInt(turnoElegido, 10); // Convierte a número
    if (opcionNumerica < 1 || opcionNumerica > idTurnos.length) {
      // Verifica si está fuera del rango de opciones
      return fallBack(
        "Ingresaste una opción inválida. Por favor, selecciona una opción válida."
      );
    } else {
      const respuesta = await cancelarCitaEspecifica(
        idTurnos[turnoElegido - 1]
      );
      if (respuesta.length == 0) {
        return await flowDynamic("No se pudo Cancelar tu Turno, intente nuevamente a la brevedad...")
      } else {
        return await flowDynamic(`¡Tu turno fué cancelado exitosamente!.`)
      }
    }
  }
);

const flowVerificarTurno = addKeyword("###VERIFICAR_TURNO###").addAnswer(
  "Verificando si posees turnos...",
  { delay: 3000 },
  async (ctx, { flowDynamic }) => {
    const turnos = await verificarTurno(ctx.from); // Llama a la función para verificar turnos

    if (Array.isArray(turnos) && turnos.length > 0) {
      let turnosMensaje = turnos
        .map((turno) => {
          const date = turno.date || "Fecha no disponible";
          const hour = turno.hour || "Hora no disponible";
          const status = turno.status || "Estado no disponible";

          return `🗓️ *Fecha:* ${date}\n⏰ *Hora:* ${hour}\n✅ *Estado:* ${status}\n💬 *Tipo de consulta:* ${turno.appointmentType}\n`;
        })
        .join("\n");

      await flowDynamic(`Aquí están tus turnos agendados:\n\n${turnosMensaje}`);
    } else {
      await flowDynamic("❌ No tienes turnos agendados.");
    }
  }
);

const flowSolicitarTurno = addKeyword("###SOLICITAR_TURNO###")
  .addAnswer(
    "👤 *Ingresa tu nombre y apellido:*",
    { capture: true },
    async (ctx, { globalState }) => {
      await globalState.update({ nombre: ctx.body });
    }
  )
  .addAnswer(
    "Gracias, ahora selecciona el tipo de consulta.\nOpciones:\n1. 🦷 Limpieza\n2. 🩺 Consulta\n3. 🔄 Otro\n4. 💉 Tratamiento",
    { capture: true },
    async (ctx, { globalState, flowDynamic, fallBack }) => {
      const tipoConsultaSeleccionado = ctx.body.trim();

      const opciones = {
        1: "Limpieza",
        2: "Consulta",
        3: "Otro",
        4: "Tratamiento",
      };

      const tipoConsulta = opciones[tipoConsultaSeleccionado];

      if (!tipoConsulta) {
        return fallBack(
          "❌ Opción no válida. Por favor, selecciona un número de la lista: 1, 2, 3 o 4."
        );
      }

      await globalState.update({ tipoConsulta });
    }
  )
  .addAnswer(
    "Por favor, ingresa la fecha seleccionada (formato: DD/MM/YYYY).",
    { capture: true },
    async (ctx, { globalState, flowDynamic, fallBack }) => {
      const fechaSeleccionada = ctx.body.trim();
      const fechaValida = moment(
        fechaSeleccionada,
        "DD/MM/YYYY",
        true
      ).isValid();
      const fechaSeleccionadaMoment = moment(fechaSeleccionada, "DD/MM/YYYY");
      const fechaActual = moment();

      if (!fechaValida) {
        return fallBack(
          "❌ La fecha ingresada no es válida. Por favor ingresa una fecha en formato DD/MM/YYYY."
        );
      }

      if (fechaSeleccionadaMoment.isBefore(fechaActual, "day")) {
        return fallBack(
          "❌ La fecha ingresada no puede ser anterior a la fecha actual. Por favor ingresa una fecha futura."
        );
      }

      const turnosConfirmadosFecha = await verificarTurnos(fechaSeleccionada);
      const horariosDisponiblesDefault = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
      ];

      await globalState.update({ fecha: fechaSeleccionada });

      let horariosFiltrados = horariosDisponiblesDefault;

      if (fechaSeleccionadaMoment.isSame(fechaActual, "day")) {
        const horaActual = fechaActual.format("HH:mm");
        horariosFiltrados = horariosDisponiblesDefault.filter(
          (horario) => horario > horaActual
        );
      }

      if (!turnosConfirmadosFecha || turnosConfirmadosFecha.length === 0) {
        if (horariosFiltrados.length === 0) {
          return await flowDynamic(
            `❌ No hay turnos disponibles para la fecha *${fechaSeleccionada}*...`
          );
        } else {
          return await flowDynamic(
            `Los turnos disponibles para la fecha *${fechaSeleccionada}* son:\n` +
              horariosFiltrados.map((horario) => `➡ - ${horario}.`).join("\n")
          );
        }
      } else {
        const turnosConfirmadosHora = turnosConfirmadosFecha.map(
          (turno) => turno.hour
        );
        const horariosDisponibles = horariosFiltrados.filter(
          (horario) => !turnosConfirmadosHora.includes(horario)
        );

        if (horariosDisponibles.length === 0) {
          return fallBack(
            `❌ No hay turnos disponibles para la fecha *${fechaSeleccionada}*, ingresa una nueva fecha.`
          );
        } else {
          return await flowDynamic(
            `Los turnos disponibles para la fecha *${fechaSeleccionada}* son:\n` +
              horariosDisponibles.map((horario) => `➡ - ${horario}.`).join("\n")
          );
        }
      }
    }
  )
  .addAnswer(
    "Ingresa el horario seleccionado de la lista anterior respetando el siguiente formato HH:MM, por ejemplo '*11:00*'.",
    { capture: true },
    async (ctx, { globalState, flowDynamic, fallBack }) => {
      const horarioSeleccionado = ctx.body.trim();
      const partesHorario = horarioSeleccionado.split(":");
      const formatoHorario = "HH:mm";
      const horarioMoment = moment(horarioSeleccionado, formatoHorario, true);
      if (partesHorario.length !== 2) {
        return fallBack(
          "❌ El formato del horario ingresado no es válido. Debe ser HH:MM, por ejemplo 15:30."
        );
      }
      if (!horarioMoment.isValid()) {
        return fallBack(
          "❌ El horario ingresado no es válido. Debe tener el formato HH:MM, por ejemplo 15:30."
        );
      }

      const fechaUsuario = globalState.getMyState().fecha;
      const esHoy = moment(fechaUsuario, "DD/MM/YYYY").isSame(moment(), "day");
      if (esHoy) {
        const horarioMoment = moment(horarioSeleccionado, "HH:mm");
        const horaActual = moment();
        if (!horarioMoment.isSameOrAfter(horaActual, "minute")) {
          return fallBack(
            "El horario que ingresaste ya ha pasado. Te pedimos que por favor selecciones un horario válido que sea igual o posterior a la hora actual."
          );
        }
      }

      const horas = parseInt(partesHorario[0], 10);
      const minutos = parseInt(partesHorario[1], 10);
      if (
        isNaN(horas) ||
        horas < 9 ||
        horas > 18 || // Extiende el rango de horas hasta 18
        isNaN(minutos) ||
        minutos % 30 !== 0 || // Asegura que los minutos sean múltiplos de 30
        minutos < 0 ||
        minutos > 59 ||
        (horas === 18 && minutos > 30) // Restringe a 18:00 y 18:30
      ) {
        return fallBack(
          "❌ El horario ingresado no es válido. Debe estar entre las 09:00 y las 18:30 con intervalos de 30 minutos."
        );
      }

      await globalState.update({ horario: horarioSeleccionado });
      await flowDynamic([
        `Tu turno es para el día *${globalState.getMyState().fecha}* a las *${
          globalState.getMyState().horario
        }*`,
        "Por favor, ingresa *Si* para confirmar el turno o *No* para cancelarlo.",
      ]);
    }
  )
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, globalState, fallBack, endFlow }) => {
      if (ctx.body.toLowerCase() === "si") {
        try {
          const turno = {
            name: globalState.getMyState().nombre,
            phone: ctx.from,
            date: globalState.getMyState().fecha,
            hour: globalState.getMyState().horario,
            appointmentType: globalState.getMyState().tipoConsulta,
          };

          await axios.post("http://localhost:5000/api/appointments", turno, {
            withCredentials: true,
          });
          await flowDynamic([
            "🎉 ¡Tu turno ha sido confirmado!",
            `🗓️ Te esperamos el día ${globalState.getMyState().fecha} a las ${
              globalState.getMyState().horario
            }.`,
            `💬 Tipo de consulta: ${globalState.getMyState().tipoConsulta}`,
          ]);
        } catch (error) {
          console.error("Error al confirmar el turno:", error);
          await flowDynamic(
            "🚨 Hubo un problema al confirmar tu turno. Inténtalo de nuevo más tarde."
          );
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
        horariosDisponibles.push(`${h}:${m < 10 ? "0" + m : m}`);
      }
    }
  }

  const turnosOcupados = globalState.getMyState().turnosOcupados || [];
  const horariosLibres = horariosDisponibles.filter(
    (horario) => !turnosOcupados.includes(horario)
  );

  if (horariosLibres.length === 0) {
    await flowDynamic(
      "Lo siento, no hay horarios disponibles para el día seleccionado."
    );
    return;
  }

  let horariosTexto = "";
  for (let i = 0; i < horariosLibres.length; i++) {
    horariosTexto += `- ${horariosLibres[i]}  `;
    if ((i + 1) % 5 === 0) {
      horariosTexto += "\n";
    }
  }

  await flowDynamic(
    `🕐 Horarios disponibles para el día ${
      globalState.getMyState().fecha
    }:\n${horariosTexto}`
  );
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
    usuarioConTurnosCancelables,
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
      tipoConsulta: "",
      turnosOcupados: [],
    },
  });
  QRPortalWeb();
};

main();
