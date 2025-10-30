import express from 'express';
const router = express.Router()
import * as login from '../controllers/login.controllers'

router
  .post("/login", login.login)

export default router