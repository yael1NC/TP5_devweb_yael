import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

console.log("NODE_ENV =", process.env.NODE_ENV);

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const contents = await fs.readFile("index.html", "utf8");
    const urlParts = request.url.split("/");
    const route = urlParts[1];
    
    switch (route) {
      case "index.html":
      case "":
        response.writeHead(200);
        return response.end(contents);
      case "random.html":
        response.writeHead(200);
        return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
      case "random":
        const nb = parseInt(urlParts[2]) || 1;
        const numbers = [];
        for (let i = 0; i < nb; i++) {
          numbers.push(Math.floor(100 * Math.random()));
        }
        response.writeHead(200);
        return response.end(`<html><p>Nombres générés: ${numbers.join(", ")}</p></html>`);
      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});