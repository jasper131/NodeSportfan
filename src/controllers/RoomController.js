import model from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import helperMethods from './../utils/helpers';
const { User, Profile, Post, Friend, ChatRoom, ChatRoomMember, RoomChat } = model;

const RoomController = {
	async createRoom(req, res) {
		try {
			const { uuid } = req.userData;
			if (!uuid) return res.status(403).send('Access denied');
			const { groupname, description } = req.body;
			if (!groupname && !description)
				return sendErrorResponse(res, 409, 'Groupname and description cannot be empty!!!');
			const group = await ChatRoom.create({
				name: groupname,
				description,
				visibility: 'private'
			});
			if (!group) return sendErrorResponse(res, 500, 'Failed to create group please try again later');
			const groupMember = await ChatRoomMember.create({
				chatroom_uuid: group.dataValues.uuid,
				member_uuid: uuid,
				is_banned: false
			});
			return sendSuccessResponse(res, 200, { message: 'Successfully created a group', data: { group, groupMember } });
		} catch (error) {
			return sendErrorResponse(res, 500, error);
		}
	},

	async joinRoom(req, res) {
		try {
			const { uuid } = req.userData;
			const { chatroom_uuid } = req.query;
			const room = await ChatRoomMember.findOne({ where: { member_uuid: uuid, chatroom_uuid } });
			if (room) return res.status(401).send('You already belong to this room');
			const groupMember = await ChatRoomMember.create({
				chatroom_uuid,
				member_uuid: uuid,
				is_banned: false
			});
			return sendSuccessResponse(res, 200, { message: 'Successfully joined a group', data: groupMember });
		} catch (error) {
			return sendErrorResponse(res, 500, error);
		}
	},

	/**this method handles the listing of groups
	 * @param req this is the incoming request
	 * @param res this is the response after the request have been implemented
	 */
	async getListOfGroups(req, res) {
		try {
			const { uuid } = req.userData;
			if (!uuid) return res.status(403).send('Access denied');
			const groups = await ChatRoom.findAll();
			return sendSuccessResponse(res, 200, { message: 'Success', data: groups });
		} catch (error) {
			return res.status(500).send(error);
		}
	},

	/**this method handles the listing of users group
	 * @param req this is the incoming request
	 * @param res this is the response after the request have been implemented
	 */
	async getMyGroups(req, res) {
		try {
			const { uuid } = req.userData;
			if (!uuid) return res.status(403).send('Access denied');
			const groups = await helperMethods.getUserGroups(uuid, ChatRoomMember);
			return sendSuccessResponse(res, 200, { message: 'Success', data: groups });
		} catch (e) {
			return res.status(500).send(e);
		}
	},

	/**this method handles listing chats in a group
	 * @param req this is the incoming request
	 * @param res this is the response after the request have been implemented
	 */
	async getGroupChats(req, res) {
		try {
			// const { uuid } = req.userData;
			const { group_uuid } = req.query;
			const data = await helperMethods.getGroupChats(group_uuid, RoomChat, ChatRoom);
			return sendSuccessResponse(res, 200, { message: "success", data });
		} catch (e) {
			return sendErrorResponse(res, 500, e);
		}
	},

	/*
		*this method handles listing chats in a group
	 * @param req this is the incoming request
	 * @param res this is the response after the request have been implemented
	*/

	async exitGroup(req, res) {
		try {
			const { uuid } = req.userData;
			const { member_uuid, chatroom_uuid } = req.query;
			await helperMethods.exitGroup(ChatRoomMember, member_uuid, chatroom_uuid);
			return sendSuccessResponse(res, 200, 'You have successfully exited the room');
		} catch (error) {
			return sendErrorResponse(res, 500, error);
		}
	},

	async checkMembership(req, res) {
		try {
			const { uuid } = req.userData;
			const { group_uuid } = req.query;
			const room = await helperMethods.checkRoomMember(uuid, group_uuid);
			if (!room) return sendErrorResponse(res, 200, 'not a member');
			return sendSuccessResponse(res, 200, room.dataValues);
		} catch (error) {
			return sendErrorResponse(res, 500, error);
		}
	}
};

export default RoomController;
