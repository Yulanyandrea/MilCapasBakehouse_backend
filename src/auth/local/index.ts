import { Router } from 'express';
import {  handleLoginUser } from './local.controller';

const router = Router();

router.post('/login',handleLoginUser)


export default router
