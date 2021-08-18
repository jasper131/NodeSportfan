'use strict';
module.exports = (sequelize, DataTypes) => {
  const Socket = sequelize.define('Socket', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_uuid: DataTypes.UUID,
    socket_id: DataTypes.STRING,
  }, {});
  Socket.associate = function(models) {
    Socket.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: 'user_uuid',
      });
  };
  return Socket;
};
