import express from 'express';
import { createRoom } from '../controllers/createroom.controller.js';
import { joinRoom } from '../controllers/joinroom.controller.js';
import { getRoomById } from '../controllers/roomById.controller.js';

const router = express.Router();

// ✅ Create a new room
router.route('/create').post(createRoom);

router.route('/join').post(joinRoom);

router.route('/:roomId').get(getRoomById);

export default router;  

