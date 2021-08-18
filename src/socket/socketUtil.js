import { generateNotification, generateMessage } from './messages';
import helperMethods from '../utils/helpers';
import models from '../models';

const { User } = models;


const sendPersonalSms = async (socket_id, user_uuid, message, io) => {
  try {
    await io.to(socket_id).emit('message', generateNotification(user_uuid, message));
    // await io.emit('jobNotification', generateNotification(job_uuid, message));// this is for test
  } catch (error) {
    console.log(error);
  }
};

const joinGroup = async (group_id, user, socket, io) => {
  await helperMethods.createGroupMember({ group_id, user });
  // await socket.join(group_id, () => { console.log(client.rooms)});
  // await io.in(group_id).emit('message', generateMessage('Admin', `Welcome to the group ${user.name}`));
};

const sendMessageToGroup = async (group_id, message, user, io, parent_uuid ="") => {
  try {
    // console.log(group_id, message)
    const  chat = await helperMethods.saveGroupChat(group_id, user.uuid, parent_uuid, message, user.name );
    await io.in(group_id).emit('message', generateMessage(user.name, chat.uuid, message));
  } catch (error) {
    console.log(error);
    await io.to(group_id).emit('groupMessage-error', 'Error sending message');
  }
}


/**
 *
 * @param {data} senderuuid id from the senders payload
 * @param {data} recipientuuid id of the recipient
 * @param {text} message message body from the sender
 * @param {token} client socket id of the sender which will be used to emit error messages back to sender.
 */
 const sendPrivateMessage = async (data, io, chat_uuid, user) => {
  try {
    data.sender_uuid = user.uuid
    const chat = await helperMethods.createPersonalChat({ ...data, chat_uuid });
    await io.to(chat_uuid).emit('personalMessage', chat);
  } catch (error) {
    console.log(error);
    await io.to(chat_uuid).emit('personalMessage-error', 'Error sending message');
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  sendPersonalSms,
  joinGroup,
  sendMessageToGroup,
  sendPrivateMessage
};