import express from 'express';
const router = express.Router()
import * as registration from '../controllers/registration.controllers'

router
  .post("/register", registration.register)
  .get("/verify", registration.verify)

export default router