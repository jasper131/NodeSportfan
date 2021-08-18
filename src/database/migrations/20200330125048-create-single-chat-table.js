'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SingleChats', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      sender_uuid: {
        type: Sequelize.UUID
      },
      recipient_uuid: {
        type: Sequelize.UUID
      },
      parent_uuid: {
        type: Sequelize.UUID,
      },
      message: {
        type: Sequelize.TEXT
      },
      deleted_at: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('SingleChats');
  }
};
