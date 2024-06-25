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
const { appendToSheet } = require("./utils");
/**
 * Declaramos las conexiones de Mongo
 */

const MONGO_DB_URI = "mongodb://0.0.0.0:27017";
const MONGO_DB_NAME = "db_bot";

// const flowPrincipal = addKeyword(EVENTS.WELCOME)
//   .addAnswer(
//     "Bienvenido al Centro Médico, a continuación te detallamos las opciones."
//   )
//   .addAnswer(
//     "1-Solicitar Turno/n 2-Cancelar Turno/n 3-Verificar turno.",
//     { capture: true },
//     async (ctx, { fallBack, flowDynamic }) => {
//       console.log(ctx.body, ctx.from);
//       if (!["1", "2", "3"].includes(ctx.body)) {
//         return fallBack("Respuesta no valida, ingresa una de las solicitadas.");
//       }
//       switch (ctx.body) {
//         case "1":
//           return await flowDynamic(
//             "Eligio opcion 1-Aqui deberia enviar al flow Agendar turno"
//           );
//         case "2":
//           return await flowDynamic(
//             "Eligio opcion 2-Aqui deberia enviar al flow Cancelar turno"
//           );
//         case "3":
//           return await flowDynamic(
//             "Eligio opcion 3-Aqui deberia enviar al flow verificar turno "
//           );
//         default:
//           return await flowDynamic(
//             "Ingresaste una opción incorrecta, intente nuevamente."
//           );
//       }
//     }
//   );

const flowDefault = addKeyword(EVENTS.WELCOME).addAnswer(
  "Bienvenido al whatsapp del Doctor Genérico, ingresa la palabra *TURNO* si deseas pedir uno"
);

const flowPrincipal = addKeyword("turno")
  .addAnswer("Bienvenido al sistema de turnos")
  .addAnswer(
    "Ingresa la fecha",
    { capture: true },
    async (ctx, ctxFn) => await ctxFn.state.update({ fecha: ctx.body })
  )
  .addAnswer(
    "Ingresa el horario",
    { capture: true },
    async (ctx, ctxFn) => await ctxFn.state.update({ horario: ctx.body })
  )
  .addAnswer(
    "Ingresa tu nombre",
    { capture: true },
    async (ctx, ctxFn) => await ctxFn.state.update({ nombre: ctx.body })
  )
  .addAnswer("Gracias por los datos", null, async (ctx,ctxFn) => {
    const fecha = ctxFn.state.get("fecha");
    const horario = ctxFn.state.get("horario")
    const nombre = ctxFn.state.get("nombre");
    await appendToSheet([[fecha,horario, nombre]]);
  })
const main = async () => {
  const adapterDB = new MongoAdapter({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
  });
  const adapterFlow = createFlow([flowPrincipal, flowDefault]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};

main();


// LINK PLANILLA GOOGLE https://docs.google.com/spreadsheets/d/1G1I6pW_a-2rqc_yfHdpYmVVoM6UFA6BUDfnS5-pCVMg/edit?usp=sharing