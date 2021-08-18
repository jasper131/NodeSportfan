module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('SingleChats', 'chat_uuid', {
    type: Sequelize.STRING,
    allowNull: true
  }),
  down: (queryInterface) => queryInterface.removeColumn('SingleChats', 'chat_uuid')
};
