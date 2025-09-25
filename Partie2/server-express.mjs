import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import logger from "loglevel";

logger.setLevel(logger.levels.DEBUG);

const host = "localhost";
const port = 8000;

const app = express();

app.set("view engine", "ejs");

if (app.get("env") === "development") app.use(morgan("dev"));

app.use(express.static("static"));

app.get("/random/:nb", async function (request, response, next) {
  const length = Number.parseInt(request.params.nb, 10);
  
  if (Number.isNaN(length)) {
    logger.warn(`Paramètre invalide reçu: ${request.params.nb}`);
    return next(createError(400, "Le paramètre doit être un nombre valide"));
  }
  
  logger.debug(`Génération de ${length} nombres aléatoires`);
  const numbers = Array.from({ length }, () => Math.floor(100 * Math.random()));
  const welcome = `Voici ${length} nombre${length > 1 ? 's' : ''} aléatoire${length > 1 ? 's' : ''} !`;
  
  response.render("random", { numbers, welcome });
});

app.use((request, response, next) => {
  logger.debug(`Route non trouvée : ${request.url}`);
  return next(createError(404));
});

app.use((error, _request, response, _next) => {
  logger.error(`Erreur ${error.status || 500}: ${error.message}`);
  const status = error.status ?? 500;
  const stack = app.get("env") === "development" ? error.stack : "";
  const result = { code: status, message: error.message, stack };
  return response.render("error", result);
});

const server = app.listen(port, host);

server.on("listening", () =>
  logger.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

logger.info(`File ${import.meta.url} executed.`);