import * as fs from 'fs';
import * as https from 'https';
import express, { Application } from "express"

import { s3Route } from "../routes"
import { config } from "../config"


// --- Setup router
const setupRouter = (app: Application) => {
    s3Route(app)
};


const startServe = async () => {
    const app: Application = express()

    setupRouter(app)

    const server = config.serverSslEnabled
        ? https.createServer({
            key: fs.readFileSync('./secrets/server.' + config.node_env + '.key'),
            cert: fs.readFileSync('./secrets/server.' + config.node_env + '.crt'),
            passphrase: ''
        }, app).listen(config.serverPort)
        : app.listen(config.serverPort);
    console.log(
        `🚀 Server started as ${config.node_env} at http${config.serverSslEnabled ? 's' : ''}://localhost:${config.serverPort}`
    );
};

export const ApiService = {
    startServe,
};
