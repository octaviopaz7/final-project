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
const axios = require("axios").default;

/**
 * Declaramos las conexiones de Mongo
 */

const MONGO_DB_URI = "mongodb://0.0.0.0:27017";
const MONGO_DB_NAME = "db_bot";


const flowSolicitarTurno = addKeyword("###_SOLICITAR_TURNO_###")
  .addAnswer(
    "Ingresa tu nombre y apellido",
    { capture: true },
    async (ctx, { flowDynamic, state, endFlow }) => {
      await state.update({ nomyape: ctx.body });
      await flowDynamic(`Gracias ${ctx.body}`);
    }
  )
  .addAnswer(
    "Ingresa la fecha deseada DD/MM",
    { capture: true },
    async (ctx, { state, flowDynamic }) => {
      await state.update({ fecha: ctx.body });
      await flowDynamic(`Fecha elegida ${ctx.body}`);
    }
  )
  .addAnswer(
    "Ingresa horario *HH:MM*",
    { capture: true },
    async (ctx, { state, flowDynamic }) => {
      await state.update({ horario: ctx.body });
      await flowDynamic(`Horario elegido ${ctx.body}`);
    }
  )
  .addAnswer(
    "Gracias por tus datos",
    null,
    async (_, { flowDynamic, state, endFlow }) => {
      
      const datos = state.getMyState();
      const turno = {
        nombre: datos.nomyape,
        fecha: datos.fecha,
        horario: datos.horario,
      };
      await flowDynamic(
        `DATOS INGRESADOS${turno.nombre + turno.fecha + turno.horario}`
      );
    }
  );

const flowDefault = addKeyword(EVENTS.WELCOME).addAnswer(
  [
    "Bienvenido a la Clinica Odontologica 🦷 te detallo acotinuación las opciones!",
    "*1-Solicitar turno* 📅",
    "*2-Cancelar Turno* ❌",
    "*3-Verificar turno* ✔",
  ],
  { capture: true },
  async (ctx, { fallBack, gotoFlow, state }) => {
    const nombre = ctx.pushName;
    await state.update({
      nombre: nombre,
    });
    if (!["1", "2", "3"].includes(ctx.body)) {
      return fallBack("Ingresaste una opción incorrecta, intenta nuevamente.");
    }
    if (ctx.body === "1") {
      return gotoFlow(flowSolicitarTurno);
    }
  }
);

const flowPrincipal = addKeyword("turno")
  .addAnswer("Bienvenido al sistema de turnos")
  .addAnswer(
    "Ingresa la fecha",
    { capture: true },
    async (ctx, { state, flowDynamic }) => {
      const respuesta = ctx.body;
      const nombre = ctx.pushName;
      console.log(ctx);
      await state.update({
        test: respuesta,
      });
      await flowDynamic(`Fecha ingresada ${respuesta} por ${nombre}`);
    }
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
  .addAnswer("Gracias por los datos", null, async (ctx) => {
    const fecha = ctxFn.state.get("fecha");
    const horario = ctxFn.state.get("horario");
    const nombre = ctxFn.state.get("nombre");
    await appendToSheet([[fecha, horario, nombre]]);
  });
const main = async () => {
  const adapterDB = new MongoAdapter({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
  });
  const adapterFlow = createFlow([
    flowPrincipal,
    flowDefault,
    flowSolicitarTurno,
  ]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};

main();
