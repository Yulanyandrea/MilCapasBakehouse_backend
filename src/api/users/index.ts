import { Router } from "express";
import { handleCreateUser,
  handleDeleteUser,
handleGetAllUsers,
handleGetUsersId,
handleUpdateUser
} from './users.controller';


const router= Router()

router.get('/',handleGetAllUsers);
router.get('/:id', handleGetUsersId);
router.post('/',handleCreateUser);
router.patch('/:id',handleUpdateUser);
router.delete('/:id',handleDeleteUser);
export default router;
