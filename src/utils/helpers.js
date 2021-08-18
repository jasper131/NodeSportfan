/* eslint-disable max-len */
import Sequelize, { Op, fn, col, and } from 'sequelize';
import models from '../models'

const { ChatRoomMember, RoomChat, User, Post, SingleChat, Profile, Follower } = models;

const helperMethods = {
	async searchWithCategoryAndLocation (point, category_uuid, Service) {
		const service = await Service.findAll({
			where: {
				[Op.and]: [
					Sequelize.where(
						Sequelize.fn(
							'ST_DWithin',
							Sequelize.col('location'),
							Sequelize.fn(
								'ST_SetSRID',
								Sequelize.fn('ST_MakePoint', point.coordinates[0], point.coordinates[1]),
								4326
							),
							0.032
						),
						true
					),
					{ category_uuid: category_uuid.dataValues.uuid }
				]
			},
			attributes: {
				exclude: [
					'password',
					'createdAt',
					'updatedAt'
				]
			},
			order: [
				[
					'createdAt',
					'DESC'
				]
			]
		});
		return service;
	},

	// search without category
	async searchWithLocation (point, Service) {
		const service = await Service.findAll({
			where: Sequelize.where(
				Sequelize.fn(
					'ST_DWithin',
					Sequelize.col('location'),
					Sequelize.fn('ST_SetSRID', Sequelize.fn('ST_MakePoint', point.coordinates[0], point.coordinates[1]), 4326),
					0.032
				),
				true
			),
			attributes: {
				exclude: [
					'password',
					'createdAt',
					'updatedAt'
				]
			},
			order: [
				[
					'createdAt',
					'DESC'
				]
			]
		});
		return service;
	},
	async searchWithCategoty (category_uuid, Service) {
		const service = await Service.findAll({
			where: {
				category_uuid: category_uuid.dataValues.uuid
			},
			attributes: {
				exclude: [
					'password',
					'createdAt',
					'updatedAt'
				]
			},
			order: [
				[
					'createdAt',
					'DESC'
				]
			]
		});
		return service;
	},
	async search (input, Service) {
		const service = await Service.findAll({
			where: {
				[Op.or]: [
					{
						service: {
							[Op.iLike]: `%${input}%`
						}
					}
				]
			},
			attributes: {
				exclude: [
					'password',
					'createdAt',
					'updatedAt'
				]
			},
			order: [
				[
					'createdAt',
					'DESC'
				]
			]
		});
		return service;
	},
	// find a wallet by the user id
	async findAWalletByUser (
		Wallet,
		uuid,
		exclude = [
			'refrence_id'
		]
	) {
		const wallet = await Wallet.findOne({
			where: { user_uuid: uuid },
			attributes: { exclude }
		});
		return wallet;
	},

	// find a wallet by the uuid of the wallet
	async findAWalletByUuid (
		Wallet,
		uuid,
		exclude = [
			'refrence_id'
		]
	) {
		const wallet = await Wallet.findOne({
			where: { uuid },
			attributes: { exclude }
		});
		return wallet;
	},

	// update a user's wallet
	async updateAUsersWallet (Wallet, balance, user_uuid) {
		await Wallet.update({ balance }, { where: { user_uuid } });
	},
	// find a particular charge by id
	async findAChargeByUuid (Charge, uuid) {
		const charge = await Charge.findOne({
			where: { uuid }
		});
		return charge;
	},
	// create a transaction object
	createTransaction (
		user_uuid,
		wallet_id,
		recipient_id,
		job_uuid,
		transaction_type,
		purpose,
		status = '',
		balance = 0,
		amount = 0
	) {
		return {
			user_uuid,
			wallet_id,
			recipient_id,
			job_uuid,
			transaction_type,
			purpose,
			status,
			balance,
			amount
		};
	},

	// find a user by uuid
	async getAUserByUuid (table, uuid) {
		const user = await table.findOne({
			where: { uuid },
			include: [{
			 model: Post,
			 as: 'posts'
			},
			{
			 model: Profile, 
			 as:'profiles'	
			}],
			attributes: {
				exclude: [
					'password',
					'createdAt',
					'updatedAt'
				]
			}
		});
		if (user) return user.toJSON();
		else return user;
	},

	//find user by username
	async getAUsernameUuid (User, username) {
		const user = await User.findOne({
			where: { username },
			attributes: [
				'uuid'
			]
		});

		return user;
	},

	// get all users
	async getAllUsernameAndEmail (User) {
		const users = await User.findAll({
			attributes: [
				'uuid',
				'username',
				'email'
			],
			order: [
				[
					'username',
					'ASC'
				]
			],
			raw: true
		});
		return users;
	},

	// find a job by uuid
	async findJobByUuid (Job, uuid, exclude) {
		const job = await Job.findOne({
			where: { uuid },
			attributes: {
				exclude
			}
		});
		return job;
	},
	// get a users socket id
	async findSocketId (table, user_uuid) {
		const user_socket_id = await table.findOne({
			where: { user_uuid },
			attributes: {
				exclude: [
					'password',
					'createdAt',
					'updatedAt'
				]
			}
		});
		return user_socket_id;
	},
	// delete a stock
	async deleteStock (table, item_uuid, professional_uuid) {
		await table.destroy({
			where: { uuid: item_uuid, professional_uuid }
		});
	},
	// like a stock
	async likeStock (table, item_uuid) {
		const likedVideo = await table.update(
			{
				likes: +1
			},
			{
				returning: true,
				where: { uuid: item_uuid }
			}
		);
		return likedVideo;
	},
	// search for a stock
	async searchStock (table, input) {
		const stocks = await table.findAll({
			where: {
				[Op.or]: [
					{ professional_name: { [Op.iLike]: `%${input}%` } },
					{ category: { [Op.iLike]: `%${input}%` } },
					{ title: { [Op.iLike]: `%${input}%` } }
				]
			},
			order: [
				[
					'createdAt',
					'DESC'
				]
			],
			attributes: {
				exclude: [
					'createdAt',
					'password'
				]
			}
		});
		return stocks;
	},
	// list stocks
	async listAllStock (table, offset, limit) {
		const stocks = await table.findAll({
			attributes: {
				exclude: [
					'createdAt',
					'password'
				]
			},
			order: [
				[
					'createdAt',
					'DESC'
				]
			],
			offset,
			limit
		});
		return stocks;
	},
	// create stock item
	async addStock (table, item_uuid, title, name, category, description, avatar, uuid, price) {
		const photo = await table.create({
			uuid: item_uuid,
			title,
			professional_name: name,
			category,
			description,
			file: avatar,
			price,
			likes: 0,
			professional_uuid: uuid
		});
		return photo;
	},

	// create a stock article
	async addStockArticle (table, item_uuid, title, name, category, description, file, uuid, price, full_text) {
		const article = await table.create({
			uuid: item_uuid,
			title,
			professional_name: name,
			category,
			description,
			file,
			price,
			likes: 0,
			professional_uuid: uuid,
			full_text
		});
		return article;
	},

	// search for all data that looks like input
	async searchForUser (table, input) {
		const users = await table.findAll({
			where: {
				[Op.or]: [
					{ name: { [Op.iLike]: `%${input}%` } },
					{ username: { [Op.iLike]: `%${input}%` } },
					{ email: { [Op.iLike]: `%${input}%` } }
				]
			},
			order: [
				[
					'createdAt',
					'DESC'
				]
			],
			attributes: {
				exclude: [
					'createdAt',
					'password',
					'password',
					'updatedAt'
				]
			}
		});
		return users;
	},
	
	// list all data in a table
	async listAllDataInTable (table) {
		const datas = await table.findAll({
			attributes: {
				exclude: [
					'updatedAt'
				]
			},
			order: [
				[
					'createdAt',
					'DESC'
				]
			]
		});
		return datas;
	},

	// list all data in a table
	async getPostDetails (key = {}) {
		try {
			let datas = await Post.findAll({
				include: [
					{
						model: User,
						attributes: ['uuid', 'name'],
						include: [
							{
								model: Profile,
								as: 'profiles',
								attributes: ['profile_pic']
							}
						]
					}
				],
				attributes: {
					exclude: [
						'updatedAt'
					]
				},
				order: [
					[
						'createdAt',
						'DESC'
					]
				],
				where: key
			});

			if (datas.length > 0) {
				datas = datas.map(data => ({
					uuid: data.uuid,
					user_uuid: data.user_uuid,
					owner_name: data.owner_name,
					post: data.post,
					media: data.media,
					comment: data.comment,
					likes: data.likes,
					createdAt: data.createdAt,
					name: data.User.name,
					profile_pic: data.User.profiles[0] ? data.User.profiles[0].profile_pic : ''
				}))
			}
			return datas;
		} catch (error) {
			console.error(error)
		}
	},

	// find if a user have a friend
	async checkForFriendship (table, user_uuid, friend_uuid) {
		const friend = await table.findOne({
			where: { user_uuid, friend_uuid },
			attributes: {
				exclude: [
					'createdAt',
					'updatedAt'
				]
			}
		});
		return friend;
	},

	// create friendship between users
	async createFriendShip (table, user_uuid, friend_uuid, friend_name) {
		const friend = await table.create({
			user_uuid,
			friend_uuid,
			friend_name,
			blocked: false,
		});
		return friend;
	},

	// check for follower
	async checkForFollower (table, user_uuid, follower_uuid) {
		const follower = await table.findOne({
			where: { user_uuid, follower_uuid },
			attributes: {
				exclude: [
					'createdAt',
					'updatedAt'
				]
			}
		});
		return follower;
	},

	// follow a user
	async createFollower (table, user_uuid, follower_uuid) {
		const follower = await table.create({
			user_uuid,
			follower_uuid,
			blocked: false,
		});
		return follower;
	},

	// un-follow user
	async unFollowUser(table, user_uuid, follower_uuid){
		try {
		 await table.destroy({
		  where: { user_uuid, follower_uuid },
		});
		} catch (error) {
		 console.log(error);
		}
	},


	// list all user's follower
	async listAllFollowers (table, user_uuid) {
		const followers = await table.findAll({
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['uuid', 'name', 'email', 'username', 'status', 'club', 'phone'],
					include: [
						{
							model: Profile,
							as: 'profiles',
							attributes: ['uuid', 'gender', 'shortBio', 'favoriteQuote', 'language', 'website', 'profile_pic']
						}
					]
				},
				{
					model: User,
					as: 'follower',
					attributes: ['uuid', 'name', 'email', 'username', 'status', 'club', 'phone'],
					include: [
						{
							model: Profile,
							as: 'profiles',
							attributes: ['uuid', 'gender', 'shortBio', 'favoriteQuote', 'language', 'website', 'profile_pic']
						}
					]
				},
			],
			where: { user_uuid, blocked: false },
			attributes: {
				exclude: [
					'createdAt',
					'updatedAt'
				]
			}
		});
		return followers;
	},

	// list user joined rooms
	async getUserGroups(user, table){
		try {
		  // console.log('here it is')
		return await table.findAll({
		  where: {member_uuid: user},
		  include: ['ChatRoom'],
		});
		} catch (e) {
		  console.log(e);
		}
		
	  },
	
	async createGroupMember(data) {
	 const { group_id, user } = data;
	 console.log(user)
	 const member =	await ChatRoomMember.create({
			chatroom_uuid: group_id,
			member_uuid: user.uuid,
			is_banned: false,
		})
	 return member;
	},

	async checkRoomMember(user_uuid, group_uuid) {
		const user = await ChatRoomMember.findOne({
			where: { member_uuid: user_uuid, chatroom_uuid: group_uuid },
			attributes: {
				exclude: [
					'createdAt',
					'updatedAt'
				]
			}
		})
		return user;
	},

	async saveGroupChat(group_uuid, sender_uuid, parent_uuid, message, sendername){
    return await RoomChat.create({
      parent_uuid,
      group_uuid,
      sender_uuid,
      sendername,
      message,
    });
  },

	  // list user joined rooms
	async getGroupChats(group_uuid, roomChats, room){
		try {
		  // console.log('here it is')
		const dRoom = await  room.findOne({
			where: { uuid: group_uuid },
			attributes: {
				exclude: [
					'createdAt',
				]
			}
		})
		const chats = await roomChats.findAll({
		  where: {group_uuid}
		});
		return { room: dRoom.dataValues, chats:chats.map(x => x.dataValues) }
		} catch (e) {
		  console.log(e);
		}
		
	  },

		async createPersonalChat(data){
			const chat = await SingleChat.create(data);
			await Follower.update(
				{
					messaged: true,
				},
				{
					where: {
						user_uuid: {
							[Op.or]: [data.sender_uuid, data.recipient_uuid]
						},
						follower_uuid: {
							[Op.or]: [data.sender_uuid, data.recipient_uuid]
						}
						},
				},
				);
			return chat;
			},


	  async getChats (user_uuid, secondP_uuid) {
		 const chats = await SingleChat.findAll({
			where: {
				sender_uuid: {
				  [Op.or]: [user_uuid, secondP_uuid]
				},
				recipient_uuid: {
				  [Op.or]: [user_uuid, secondP_uuid]
				}
			  },
		 }) 
		 return chats;
	  },

	
	async deleteEntry(table, table_uuid, user_uuid){
		try {
		 await table.destroy({
		 where: { uuid: table_uuid, user_uuid }
		});
		} catch (error) {
		 console.log(error);
		}
		
	},

	// exit a group
	async exitGroup(table, member_uuid, chatroom_uuid){
		try {
		 await table.destroy({
		 where: {  member_uuid, chatroom_uuid }
		});
		} catch (error) {
		 console.log(error);
		}
		
	},

	// save post
	async savePost(uuid, name, comment, post_uuid, Post){
		const post = await Post.findOne({
			where:{ uuid: post_uuid}
		});
		if (post.comment == null) {post.comment = [] }
		await post.comment.push(
			{
		  user_uuid: uuid,
		  user_name: name,
		  date_sent: new Date(),
		  comment,
	   });
	   const postUpdate = await Post.update(
		   {
			 
			 comment: post.comment,
		   },
		   {
			 returning: true,
			 where: { uuid: post_uuid },
		   },
		 );
	  },

};
export default helperMethods;
