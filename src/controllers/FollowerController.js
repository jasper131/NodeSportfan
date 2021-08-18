import model from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import helperMethods from './../utils/helpers';
const { User, Profile, Follower } = model;
const {
  checkForFollower,
  createFollower,
  unFollowUser,
  listAllFollowers
} = helperMethods;

const FollowerController = {
  async followUser(req, res) {
    try {
      const { uuid } = req.userData;
      const { user_uuid } = req.query;
      const user = await checkForFollower(Follower, user_uuid, uuid);
      if (user) return sendErrorResponse(res, 403, 'User already followed');
      const follower = await createFollower(Follower, user_uuid, uuid);
      return sendSuccessResponse(res, 200, { message: 'Followed successfully', follower });
    } catch (e) {
      return sendErrorResponse(res, 500, 'An error occurred following user');
    };
  },

  async unFollowUser(req, res) {
    try {
      const { uuid } = req.userData;
      const { user_uuid } = req.query;
      const user = await checkForFollower(Follower, uuid, user_uuid);
      if (!user) return sendErrorResponse(res, 403, 'You cannot unFollow whom you have not followed');
      await unFollowUser(Follower, uuid, user_uuid);
      return sendSuccessResponse(res, 200, 'unFollowed successfully');
    } catch (e) {
      return sendErrorResponse(res, 500, 'An error occurred following user');
    };
  },

  // view a user followers
  async listUserFollowers(req, res) {
    try {
      const { uuid } = req.userData;
      //  const { user_uuid } = req.query;
      const user = await listAllFollowers(Follower, uuid);
      if (!user) return sendErrorResponse(res, 404, 'User not found');
      return sendSuccessResponse(res, 200, user);
    } catch (e) {
      console.error(e)
      return sendErrorResponse(res, 500, 'An error occurred viewing user details');
    }
  },

  // check if a user is following another
  async CheckFollowUser(req, res) {
    try {
      const { uuid } = req.userData;
      const { user_uuid } = req.query;
      const user = await checkForFollower(Follower, user_uuid, uuid);
      const check = user ? true : false;
      return sendSuccessResponse(res, 201, check);
    } catch (e) {
      return sendErrorResponse(res, 500, 'An error occurred following user');
    };
  },
};

export default FollowerController;
