import models from '../models';
import { sendPrivateMessage } from './socketUtil';
import helperMethods from '../utils/helpers';

const {  User } = models;
export default async function (socket, io, user){
  // a user joins a room onces
  socket.on('join-chat', async (data) => {
    try {
      console.log('here here here', data);
      const { chat_uuid } = data;
      socket.join(chat_uuid, () => {
        socket.on(`${chat_uuid}-message`, (data) => {
        //   const { sender_uuid, recipient_uuid, parent_uuid, message, } = data;
          sendPrivateMessage(data, io, chat_uuid, user);
        })
      })
    } catch (error) {
        console.log(error);
    }
  })
};
