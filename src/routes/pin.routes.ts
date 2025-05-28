import express from 'express';
const router = express.Router()
import * as pin from '../controllers/pin.controllers'

router
  .post("/create", pin.create)
  // .get("/verify", registration.verify)

export default router