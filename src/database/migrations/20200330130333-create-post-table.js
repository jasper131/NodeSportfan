'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_uuid: {
        type: Sequelize.UUID
      },
      owner_name: {
        type: Sequelize.STRING,
      },
      post: {
        type: Sequelize.TEXT
      },
      media: {
        type: Sequelize.STRING,
      },
      comment:{
        type: Sequelize.ARRAY(Sequelize.JSON),
      },
      likes: {
        type: Sequelize.ARRAY(Sequelize.JSON),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};
