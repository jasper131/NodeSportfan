'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_uuid: DataTypes.UUID,
    friend_uuid: DataTypes.UUID,
    friend_name: DataTypes.STRING,
    blocked: DataTypes.BOOLEAN,
  }, {});
  Friend.associate = function(models) {
    // associations can be defined here
  };
  return Friend;
};