import dotenv from "dotenv";
dotenv.config();

import { APPConfig } from './src/configs/app.configs'
import express from 'express';
import cors from 'cors';
import http from 'http';

import { loggerMiddleware, loggerToConsole } from './src/entrypoint/logger';
import coreMiddleware from './src/entrypoint/coreMiddleware';
import routes from './src/entrypoint/router';

const app = express();
app.options('*', cors());

//core
app.use(coreMiddleware)

//logger
if(APPConfig.ENABLE_STREAMLOG == true) app.use(loggerMiddleware)
app.use(loggerToConsole)


routes(app);


//conventional deployment
const port = APPConfig.PORT;
const server = http.createServer(app);


server.listen(port, async () => {
    //await decrypt_env();
    console.log('RESTful API server started on: ' + port);
});

server.on('close', async () => {
    //await delete_env();
    console.log('Server has been closed and environment variables cleaned up');
});

/*
//serverless deployment
import { APIGatewayEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import serverless from 'serverless-http';
console.log('Running on lambda-', APPConfig.STAGE);

const serverlesswrap = serverless(app);

export const handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
    return await serverlesswrap(event, context);
};
*/
