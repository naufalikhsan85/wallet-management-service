import express from 'express';
import service from '../routes/index'
import { APPConfig } from '../configs/app.configs'

const _basepath: string = APPConfig.BASEPATH;
console.log("basepath:", typeof _basepath);
let basepath: string = "";

if (_basepath !== "" && typeof _basepath !== "undefined") {
    basepath = "/" + _basepath;
    console.log("starting with basepath");
} else {
    basepath = "";
    console.log("starting without basepath");
}


//export function part
export default function(app: express.Application): void {
    app.use(`${basepath}/v1`, service);
}