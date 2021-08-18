'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoomChat = sequelize.define('RoomChat', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    parent_uuid: DataTypes.TEXT,
    group_uuid: DataTypes.UUID,
    sender_uuid: DataTypes.UUID,
    sendername: DataTypes.TEXT,
    message: DataTypes.TEXT,
    deleted_at: DataTypes.DATE
  }, {});
  RoomChat.associate = function(models) {
    // associations can be defined here
  };
  return RoomChat;
};
