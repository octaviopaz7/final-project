const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MongoAdapter = require("@bot-whatsapp/database/mongo");
const axios = require("axios").default;

const MONGO_DB_URI = "mongodb://0.0.0.0:27017";
const MONGO_DB_NAME = "db_bot";

const flujoEnd = addKeyword("endflow")
  .addAnswer(
    "bienvenido al flujo endflow ingresa 1 si quieres finalizar 2 si queres continuar",
    { capture: true },
    async (ctx, { endFlow, flowDynamic }) => {
      if (ctx.body === "1") {
        return endFlow("Saliendo de flujo");
      }
    }
  )
  .addAnswer("answer 2");

const cancelarTurno = async (numeroCelular) => {
  try {
    const respuesta = await axios.put(
      `http://localhost:5000/api/appointments/phone/${numeroCelular}`,
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

const verificarTurno = async (numeroCelular) => {
  try {
    const respuesta = await axios.get(
      `http://localhost:5000/api/appointments/phone/${numeroCelular}`
    );
    if (respuesta.status === 200 && respuesta.data) {
      return respuesta.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al verificar el turno:", error);
    return null;
  }
};

const flowCancelarTurno = addKeyword("###CANCELAR_TURNO###")
  .addAnswer(
    "Verificando si tienes un turno programado...",
    async (ctx, { flowDynamic, endFlow, globalState }) => {
      const turno = await verificarTurno(ctx.from);
      if (turno === null) {
        return endFlow("No tenes turno capo");
      }
      if (turno != null && turno.status === "Pendiente") {
        globalState.update({
          nombre: turno.name,
          fecha: turno.date,
          horario: turno.hour,
        });
        console.log(turno);
        return await flowDynamic([
          {
            body: `Tienes un turno para el día ${turno.date}, en el horario ${turno.hour}`,
          },
        ]);
      } else {
        return endFlow("No tenes turno capo");
      }
    }
  )
  .addAnswer(
    "¿Seguro que quieres cancelarlo? *Si* o *No*",
    { capture: true },
    async (ctx, { flowDynamic, globalState, fallBack, endFlow }) => {
      if (ctx.body.toLowerCase() === "si") {
        try {
          await axios.put(
            `http://localhost:5000/api/appointments/phone/${ctx.from}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          await flowDynamic([{ body: "Tu turno ha sido cancelado!" }]);
        } catch (error) {
          console.error("Error al cancelar el turno:", error);
          await flowDynamic([{ body: "No posees un turno actualmente." }]);
        }
        return endFlow();
      } else if (ctx.body.toLowerCase() === "no") {
        return endFlow(
          `Tu turno sigue activo. Te esperamos el día ${
            globalState.getMyState().fecha
          } a las ${globalState.getMyState().horario}`
        );
      } else {
        return fallBack(
          "Ingresaste una opción incorrecta, recordá ingresar si o no"
        );
      }
    }
  );

const flowVerificarTurno = addKeyword("###VERIFICAR_TURNO###").addAnswer(
  "Verificando si posees un turno...",
  { delay: 3000 },
  async (ctx, { flowDynamic }) => {
    const turno = await verificarTurno(ctx.from);
    if (turno && turno.status === "Pendiente") {
      return await flowDynamic(
        `Tienes un turno para el día ${turno.date}, en el horario ${turno.hour}`
      );
    } else if (turno === null) {
      return await flowDynamic("No posees un turno actualmente");
    } else {
      return await flowDynamic("No tienes registrado un turno aún.");
    }
  }
);

const flowSolicitarTurno = addKeyword("###SOLICITAR_TURNO###")
  .addAnswer(
    "Ingresa tu nombre y apellido",
    { capture: true },
    async (ctx, { flowDynamic, globalState, endFlow }) => {
      await globalState.update({ nombre: ctx.body });
      await flowDynamic(`Gracias ${ctx.body}`);
    }
  )
  .addAnswer(
    "Ingresa la fecha deseada DD/MM",
    { capture: true },
    async (ctx, { globalState, flowDynamic }) => {
      const fechaIngresada = ctx.body;
      const partesFecha = fechaIngresada.split("/");
      const dia = parseInt(partesFecha[0], 10);
      const mes = parseInt(partesFecha[1], 10);
      const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (mes < 1 || mes > 12 || dia < 1 || dia > diasPorMes[mes - 1]) {
        return await flowDynamic(
          "El día ingresado no es válido para el mes especificado."
        );
      }
      const fechaParaGuardar = `${fechaIngresada}/2024`;
      await globalState.update({ fecha: fechaParaGuardar, phone: ctx.from });
    }
  )
  .addAnswer(
    "Ingresa horario HH:MM",
    { capture: true },
    async (ctx, { globalState, flowDynamic, fallBack }) => {
      const horarioIngresado = ctx.body.trim();
      const partesHorario = horarioIngresado.split(":");
      if (partesHorario.length !== 2) {
        return fallBack(
          "El formato del horario ingresado no es válido. Debe ser HH:MM."
        );
      }
      const horas = parseInt(partesHorario[0], 10);
      const minutos = parseInt(partesHorario[1], 10);
      if (
        isNaN(horas) ||
        horas < 0 ||
        horas > 23 ||
        isNaN(minutos) ||
        minutos < 0 ||
        minutos > 59
      ) {
        return fallBack(
          "El horario ingresado no es válido. Debe ser HH:MM",
          "Intente nuevamente para finalizar"
        );
      }
      await globalState.update({ horario: ctx.body });
      await flowDynamic([
        `Ingresa *Si* para confirmar el turno para el día *${
          globalState.getMyState().fecha
        }* a las *${globalState.getMyState().horario}*`,
      ]);
    }
  )
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, globalState, fallBack, endFlow }) => {
      const turno = {
        name: globalState.getMyState().nombre,
        phone: globalState.getMyState().phone,
        date: globalState.getMyState().fecha,
        hour: globalState.getMyState().horario,
      };

      if (ctx.body.toLowerCase() === "si") {
        try {
          await axios.post("http://localhost:5000/api/appointments", turno, {
            withCredentials: true,
          });
          return await flowDynamic([
            `Tu turno ha sido confirmado!`,
            ` Te esperamos el día ${globalState.getMyState().fecha} a las ${
              globalState.getMyState().horario
            }`,
          ]);
        } catch (error) {
          console.error("Error al confirmar el turno:", error);
          return await flowDynamic(
            "Hubo un problema al confirmar tu turno. Inténtalo de nuevo más tarde."
          );
        }
      } else if (ctx.body.toLowerCase() === "no") {
        return endFlow("Cancelando turno");
      } else {
        return fallBack(
          "Ingresaste una opción incorrecta, recordá ingresar si o no"
        );
      }
    }
  );

const flowDefault = addKeyword(EVENTS.WELCOME).addAnswer(
  [
    "Bienvenido a la Clinica Odontologica 🦷 te detallo a continuación las opciones!",
    "1-Solicitar turno 📅",
    "2-Verificar turno ✔",
    "3-Cancelar Turno ❌",
  ],
  { capture: true },
  async (ctx, { fallBack, gotoFlow, globalState }) => {
    const nombre = ctx.pushName;
    await globalState.update({
      nombre: nombre,
    });
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
    flujoEnd,
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
    },
  });
  QRPortalWeb();
};

main();
