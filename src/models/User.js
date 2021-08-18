'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			name: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				allowNull: {
					args: false,
					msg: 'Please enter your Email Address'
				},
				unique: {
					args: true,
					msg: 'Email Already Exist!!!'
				},
				validate: {
					isEmail: {
						args: true,
						msg: 'Please Enter A Valid Email Address'
					}
				}
			},
			phone: DataTypes.REAL,
			username: {
				type: DataTypes.STRING,
				allowNull: {
					args: false,
					msg: 'Please Enter Your Username'
				},
				unique: {
					args: false,
					msg: 'Username Already Exist'
				}
			},
			password: DataTypes.STRING,
			address: DataTypes.STRING,
			verified: DataTypes.BOOLEAN,
			role: {
				type: DataTypes.ENUM('user', 'admin'),
				defaultValue: 'user'
			},
			status: {
				type: DataTypes.ENUM('inactive', 'coach', 'fan', 'player'),
				defaultValue: 'inactive'
			},
			club: DataTypes.STRING
		},
		{}
	);
	User.associate = function (models){
		// associations can be defined here
		User.hasMany(models.Token, {
			foreignKey: 'user_uuid',
			as: 'tokens',
			onDelete: 'CASCADE'
		});

		User.hasMany(models.Profile, {
			foreignKey: 'user_uuid',
			as: 'profiles',
			onDelete: 'CASCADE'
		});

		User.hasMany(models.Post, {
			foreignKey: 'user_uuid',
			as: 'posts',
			onDelete: 'CASCADE'
		});

		User.belongsTo(models.Follower, {
			foreignKey: 'uuid',
			target: 'follower_uuid',
			as: 'profile',
			onDelete: 'CASCADE'
		})

		User.belongsTo(models.SingleChat, {
			foreignKey: 'uuid',
			target: 'sender_uuid',
			onDelete: 'CASCADE'
		})

		User.belongsTo(models.SingleChat, {
			foreignKey: 'uuid',
			target: 'recipient_uuid',
			onDelete: 'CASCADE'
		})
	};
	return User;
};
