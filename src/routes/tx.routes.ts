import express from 'express';
const router = express.Router()
import * as transaction from '../controllers/transaction.controllers'

router
  .post("/build", transaction.build)
  .post("/send", transaction.send)

export default router