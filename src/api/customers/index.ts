import { Router } from 'express';
import { handleCreateCustomer,
handleGetCustomer,
handleGetCustomerId,
handleUpdateCustomer,
handleDeleteCustomer} from './customer.controller';

const router = Router();
router.get('/', handleGetCustomer);
router.get('/:id',handleGetCustomerId);
router.post('/', handleCreateCustomer);
router.patch('/:id', handleUpdateCustomer);
router.delete('/:id', handleDeleteCustomer);

export default router;
