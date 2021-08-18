'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			uuid: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			email: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING
			},
			phone: {
				allowNull: true,
				type: Sequelize.REAL
			},
			username: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING
			},
			address: {
				type: Sequelize.STRING
			},
			verified: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			role: {
				type: Sequelize.ENUM('user', 'admin'),
				defaultValue: 'user'
			},
			status: {
				type: Sequelize.ENUM('coach', 'player', 'fan', 'inactive'),
				defaultValue: 'inactive'
			},
			club: {
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
		return queryInterface.dropTable('Users');
	}
};
