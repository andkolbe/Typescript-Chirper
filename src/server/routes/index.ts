import { Router } from 'express'; //  import * as express from 'express';
import chirpsRouter from './chirps' // chirpsRouter can be called anything

const router = Router(); // const router = express.Router();

router.use('/chirp/', chirpsRouter);

export default router;


// index.ts will index all other routers together