import express from 'express';
import test from './test.routes'
import registration from './registration.routes'

const router = express.Router();
router.use(`/test`, test);
router.use(`/registration`, registration);

export default router;