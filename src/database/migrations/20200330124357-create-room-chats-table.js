'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RoomChats', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      parent_uuid: {
        type: Sequelize.TEXT
      },
      group_uuid: {
        type: Sequelize.UUID
      },
      sender_uuid: {
        type: Sequelize.UUID
      },
      sendername: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('RoomChats');
  }
};
