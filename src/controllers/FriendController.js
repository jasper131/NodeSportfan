import model from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import helperMethods from './../utils/helpers';
const { User, Profile, Friend } = model;

const FriendController = {
  async addFriend(req, res) {
   try {
    const { uuid } = req.userData;
    const { friend_uuid, friend_name } = req.body;
    const friend = await helperMethods.checkForFriendship(Friend, uuid, friend_uuid);
    if (friend) return sendErrorResponse(res, 409, `${friend_name} already your friend`);
    await helperMethods.createFriendShip(Friend, uuid, friend_uuid, friend_name);
    return sendSuccessResponse(res, 200, 'We have sent a request to the user');
   } catch (e) {
      return sendErrorResponse(res, 500, 'An error occurred please try again');
   }
  },

//   async acceptFriend(req, res) {
//       try {
//         const { id } = req.query;
//         const 
//       } catch (e) {
//           console.log(e);
//           return sendErrorResponse(res, 500, 'An error occurred');
//       }
//   }
};

export default FriendController;