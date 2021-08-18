'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatRoomMember = sequelize.define('ChatRoomMember', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    chatroom_uuid: DataTypes.UUID,
    member_uuid: DataTypes.UUID,
    is_banned: DataTypes.BOOLEAN
  }, {});
  ChatRoomMember.associate = function(models) {
    // associations can be defined here
    ChatRoomMember.belongsTo(models.ChatRoom, {
      foreignKey: 'chatroom_uuid',
      targetKey: 'uuid',
      as: 'ChatRoom',
      onDelete: 'CASCADE',
    });
  };
  return ChatRoomMember;
};
