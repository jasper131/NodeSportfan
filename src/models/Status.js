'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_uuid: DataTypes.UUID,
    owner_name: DataTypes.STRING,
    post: DataTypes.TEXT,
    media: DataTypes.STRING,
    views: DataTypes.ARRAY(DataTypes.JSON)
  }, {});
  Status.associate = function(models) {
    // associations can be defined here
  };
  return Status;
};

/**
 * view object structure
 * {
 *  viewer_name,
 *  date_viewed
 * }
 */