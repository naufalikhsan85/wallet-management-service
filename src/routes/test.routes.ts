import express from 'express';
const router = express.Router()
import * as test from '../controllers/test.controllers'

router
  .get("/test", test.testAPI)

export default router