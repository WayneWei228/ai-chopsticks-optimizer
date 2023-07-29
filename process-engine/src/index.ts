import express, {Express, Request, Response} from 'express';
import {mainRoutes} from './routes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import log4js from "log4js";

log4js.configure({
    appenders: {cheese: {type: "file", filename: "ai_chopsticks.log"}},
    categories: {default: {appenders: ["cheese"], level: "error"}},
});

const logger = log4js.getLogger();
logger.level = "debug";

dotenv.config();

const app: Express = express(); 
const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/', mainRoutes);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});