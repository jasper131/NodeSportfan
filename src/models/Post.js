'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
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
    comment: DataTypes.ARRAY(DataTypes.JSON),
    likes: DataTypes.ARRAY(DataTypes.JSON)
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, {
      foreignKey: 'user_uuid'
    })
  };
  return Post;
};


/**
 * media is the url to of the media added to the post.
 * it is nullable
 * it could be image or video
 */
// sample comment object

// {
//     user_uuid,
//     user_name,
//     date_sent,
//     comment,
// }

/**
 *  sample likes object
 * {
 * user_uuid,
 * user_name,
 * like: true or false true for like false for dislike
 * }
 */
