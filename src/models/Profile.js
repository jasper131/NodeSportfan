'use strict';
module.exports = (sequelize, DataTypes) => {
	const Profile = sequelize.define(
		'Profile',
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			user_uuid: DataTypes.UUID,
			gender: DataTypes.STRING,
			shortBio: DataTypes.STRING,
			favoriteQuote: DataTypes.STRING,
			language: DataTypes.STRING,
			website: DataTypes.STRING,
			profile_pic: DataTypes.STRING
		},
		{}
	);
	Profile.associate = function (models){
		// associations can be defined here
		// associations can be defined here
		Profile.belongsTo(models.User, {
			onDelete: 'CASADE',
			foreignKey: 'user_uuid'
		});
	};
	return Profile;
};
