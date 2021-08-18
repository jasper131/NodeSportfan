import { verifyToken } from '../utils/processToken';
import model from '../models';
import {sendErrorResponse, errorMsg} from "../utils/sendResponse";

const { User } = model;

const socketAuth = async (token, socket, io) => {
  try {
    if (!token) return io.to(socket.id).emit('login_error', {message:'Access denied please login'});
    const { email } = verifyToken(token);
    const user = await User.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      },
      // include: ['token'],
    });
    if (!user)  return io.to(socket.id).emit('login_error', {message:'Account details not found'});
    return user.dataValues;
  } catch (e) {
    console.log(e);
    io.to(socket.id).emit('login_error', {message:'Please login'});
  }
};

export {
  socketAuth,
};
