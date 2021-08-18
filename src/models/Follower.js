'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_uuid: DataTypes.UUID,
    follower_uuid: DataTypes.UUID,
    blocked: DataTypes.BOOLEAN,
  }, {});
  Follower.associate = function(models) {
    // associations can be defined here
    Follower.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_uuid'
    });
    Follower.belongsTo(models.User, {
      as: 'follower',
      foreignKey: 'follower_uuid'
    });
  };
  return Follower;
};