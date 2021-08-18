'use strict';
module.exports = (sequelize, DataTypes) => {
	const Token = sequelize.define(
		'Token',
		{
			uuid: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			forgetPasswordId: {
				type: DataTypes.STRING
			},
			verifyId: {
				type: DataTypes.STRING
			}
		},
		{}
	);
	Token.associate = function (models){
		// associations can be defined here
		Token.belongsTo(models.User, {
			onDelete: 'CASADE',
			foreignKey: 'user_uuid'
		});
	};
	return Token;
};
