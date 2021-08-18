import model from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import helperMethods from './../utils/helpers';
import uploadImage from './../services/imageuploader';
const { User, Profile, Post, Friend, ChatRoom, ChatRoomMember, RoomChat } = model;


const PersonalMessageController = {
  /**this method handles listing chats between two users
  * @param req this is the incoming request
  * @param res this is the response after the request have been implemented
  */
  async getChats(req, res) {
    try {
      const { uuid } = req.userData;
      const { secondP_uuid } = req.query;
      const data = await helperMethods.getChats(uuid, secondP_uuid);
      return sendSuccessResponse(res, 200, data);
    } catch (e) {
      return sendErrorResponse(res, 500, e);
    }
  }

};

export default PersonalMessageController;
