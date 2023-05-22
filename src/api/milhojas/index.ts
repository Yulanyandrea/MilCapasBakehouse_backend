import { Router } from 'express';
import {  handleCreateMilhoja,
 handleDeleteMilhoja,
handleGetAllMilhojas,
handleGetMilhojasId,
handleUpdateMilhoja,
handleFilterMilhojas} from './milhojas.controller';

const router = Router();
router.get('/', handleGetAllMilhojas);
router.get('/filter',handleFilterMilhojas);
router.get('/:id',handleGetMilhojasId);
router.post('/', handleCreateMilhoja);
router.patch('/:id', handleUpdateMilhoja);
router.delete('/:id', handleDeleteMilhoja);

export default router;
