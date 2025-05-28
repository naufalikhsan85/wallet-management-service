import express from 'express';
import test from './test.routes'
import registration from './registration.routes'
import pin from './pin.routes'

const router = express.Router();
router.use(`/test`, test);
router.use(`/registration`, registration);
router.use(`/pin`, pin);


export default router;