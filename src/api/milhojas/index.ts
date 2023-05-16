import { Router } from 'express';
import {  handleCreateMilhoja,
 handleDeleteMilhoja,
handleGetAllMilhojas,
handleGetMilhojasId,
handleUpdateMilhoja} from './milhojas.controller';

const router = Router();
router.get('/', handleGetAllMilhojas);
router.get('/:id',handleGetMilhojasId);
router.post('/', handleCreateMilhoja);
router.patch('/:id', handleUpdateMilhoja);
router.delete('/:id', handleDeleteMilhoja);

export default router;
