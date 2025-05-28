import express from 'express';
const router = express.Router()
import * as pin from '../controllers/pin.controllers'

router
  .post("/create", pin.create)
  .post("/change", pin.change)

export default router