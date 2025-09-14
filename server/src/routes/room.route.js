import express from 'express';
import { createRoom } from '../controllers/createroom.controller.js';
import { joinRoom } from '../controllers/joinroom.controller.js';

const router = express.Router();

// ✅ Create a new room
router.route('/create').post(createRoom);

router.route('/join').post(joinRoom);

export default router;  

