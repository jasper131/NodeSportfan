// import { sendJobStatusNotification } from '../utils/socketUtils';
import { sendPersonalSms } from './socketUtil'

const EventEmitter = require('events');
// const { io } = require('../index');

class TasksEmitter extends EventEmitter {}
const Emitter = new TasksEmitter();
let io;
export default (x) => {
  io = x;
};
Emitter.on('message-event', async (arg) => {
  await sendPersonalSms(arg.socket_id, arg.user_uuid, arg.message, io);
});


export { Emitter };
