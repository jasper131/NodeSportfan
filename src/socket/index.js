import { socketAuth } from '../middleware/socketAuth';
import models from '../models';
import roomConnect from '../socket/roomConnect';
import postConnect from '../socket/postConnect';
import personalConnect from '../socket/personalConnect';

const emmiter = require('./EventHandler');

const { Socket } = models;

const SocketDev = (io) => {
  // console.log(`io: ${io}`)
  // let onlineSockets = [];
  if (io) {
    io.on('connection', async (socket) => {
      console.log('a user connected');
      let user = 'anonymous';
      const { handshake } = socket;
      socket.on('authenticate', async (data) => {
        try {
          const header = data.token;
          user = await socketAuth(header, socket, io);
          const token = await Socket.findOne({ where: { user_uuid: user.uuid } });
          if (token) {
            await Socket.update({ socket_id: socket.id },
              {
                returning: true,
                where: {
                  user_uuid: user.uuid,
                },
              });
          } else {
            await Socket.create({ user_uuid: user.uuid, socket_id: socket.id });
          }
        } catch (error) {
          console.log(error);
        }
      });
      if (handshake.headers.token) {
        const header = handshake.headers.token;
        if (header) {
          user = await socketAuth(header, socket, io);
          // await saveSocketId(user.uuid, socket.id);
          try {
            const token = await Socket.findOne({ where: { user_uuid: user.uuid } });
            if (token) {
              await Socket.update({ socket_id: socket.id },
                {
                  returning: true,
                  where: {
                    user_uuid: user.uuid,
                  },
                });
            } else {
              await Socket.create({ user_uuid: user.uuid, socket_id: socket.id });
            }
          } catch (error) {
            console.log(error);
          }
        }
      }else {
        console.log('message');
        io.emit('login_error', 'login please')
      }

      emmiter.default(io);
      roomConnect(socket, io, user);
      postConnect(socket, io, user);
      personalConnect(socket, io, user);
      // Disconnect event
      socket.on('disconnect', (reason) => {
        // Clean-up, set socket_id for the user to null
      });
    });
  }
};

export default SocketDev;
