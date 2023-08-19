import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware';
import { getUserData, postUserData } from '../controllers/userDataController';

const router = express.Router();
router.get('/getdata', getUserData);
router.post('/', postUserData);
export default router;
