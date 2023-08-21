import express from 'express';
import { getUserData, postUserData } from '../controllers/userDataController.js';

const router = express.Router();

router.get('/getdata', getUserData);
router.post('/', postUserData);

export default router;