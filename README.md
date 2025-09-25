# 1.1
```txt
HTTP/1.1 200 OK
Date: Fri, 19 Sep 2025 22:37:43 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked
```

# 1.2
```txt
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 19 Sep 2025 22:55:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 20
```

# 1.3

Le fichier index.html n'existe pas, une erreur est affichée dans la console du serveur et le client ne recevra pas de réponse 

# 1.4
```js
Error: ENOENT: no such file or directory, open 'index.html'
    at async open (node:internal/fs/promises:642:25)
    at async Object.readFile (node:internal/fs/promises:1279:14) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'index.html'
}
```

# 1.5

```js
import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(_request, response) {
  try {
    const contents = await fs.readFile("index.html", "utf8");
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.end(contents);
  } catch (error) {
    console.error(error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Erreur serveur : fichier introuvable");
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
```

# 1.6 

Le fichier package.json :

Ajout de cross-env dans les dependencies
Ajout de nodemon dans les devDependencies

Création du dossier node_modules/ avec les packages installés

Création du fichier package-lock.json qui verrouille les versions exactes des dépendances

# 1.7

Mode développement : Idéal pour coder car le serveur redémarre automatiquement à chaque modification

Mode production : Optimisé pour la performance, sans surveillance inutile des fichiers

# 1.8

http://localhost:8000/index.html
200

http://localhost:8000/random.html
200 

http://localhost:8000/
404

http://localhost:8000/dont-exist
404


# Partie 2 

# 2.1

express : https://expressjs.com/

http-errors : https://github.com/jshttp/http-errors#readme

loglevel : https://github.com/pimterry/loglevel#readme

morgan : https://github.com/expressjs/morgan#readme

# 2.2

![alt text](image.png)

![alt text](image-1.png)

![alt text](image-2.png)

# 2.3

http://localhost:8000/
```txt
HTTP/1.1 304 Not Modified \n
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Tue, 23 Sep 2025 22:52:40 GMT
ETag: W/"f8-19978c76eff"
Date: Tue, 23 Sep 2025 22:57:44 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

http://localhost:8000/index.html
```txt
HTTP/1.1 304 Not Modified
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Tue, 23 Sep 2025 22:52:40 GMT
ETag: W/"f8-19978c76eff"
Date: Tue, 23 Sep 2025 23:02:13 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

http://localhost:8000/random/5
```txt
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 79
ETag: W/"4f-lCf8XAL+SfXmo6yX+tDTxXf6Qd0"
Date: Tue, 23 Sep 2025 23:02:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

# 2.4

Événement listening : Se déclenche de manière asynchrone une fois que :

Le port est disponible

Le serveur est effectivement en écoute

Il peut accepter des connexions entrantes

# 2.5
L'option activée par défaut dans le middleware express.static() est index.

Cette option a la valeur par défaut ["index.html"] et permet de servir automatiquement le fichier index.html quand on accède à la racine / d'un répertoire.

# 2.6

Ctrl + R : 304 = Optimisation : pas de transfert de données, utilisation du cache
Ctrl + Shift + R 200 forcé = Bypass du cache : re-téléchargement complet du fichier

# 2.7

Il y a bien un changement entre les deux modes.

En mode developpement, l'erreur est écrite au complet.

Alors qu'en mode production, l'erreur n'est pas complète.


