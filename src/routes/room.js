import express from 'express';
import Auth from './../middleware/Auth';
import RoomController from './../controllers/RoomController';

const {  
  createRoom,
  getListOfGroups,
  getMyGroups,
  getGroupChats,
  exitGroup,
  checkMembership,
  joinRoom
} = RoomController;

const router = express.Router();
router.post('/create-room', Auth, createRoom);
router.get('/list-rooms', Auth, getListOfGroups);
router.get('/list-user-rooms', Auth, getMyGroups);
router.get('/chat', getGroupChats);
router.delete('/exit-room', Auth, exitGroup);
router.get('/check-membership', Auth, checkMembership);
router.post('/join', Auth, joinRoom);

export default router;
