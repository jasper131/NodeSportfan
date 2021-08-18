'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Profiles', {
			uuid: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			user_uuid: {
				type: Sequelize.UUID,
				references: {
					model: 'Users',
					key: 'uuid',
					as: 'user_uuid'
				}
			},
			gender: Sequelize.STRING,
			shortBio: Sequelize.STRING,
			favoriteQuote: Sequelize.STRING,
			language: Sequelize.STRING,
			website: Sequelize.STRING,
			profile_pic: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Profiles');
	}
};
