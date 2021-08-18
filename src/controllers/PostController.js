import model from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import helperMethods from './../utils/helpers';
import uploadImage from './../services/imageuploader';
import { post } from 'request';
const { User, Profile, Post, Friend } = model;

const PostController = {
  // create a post 
  async createPost(req, res) {
    try {
      let media = '';
      const { uuid, name } = req.userData;
      const { post } = req.body;
      if (!post) return sendErrorResponse(res, 422, 'post body cannot be empty');
      if (req.file) {
        media = await uploadImage(req.file);
      }
      const newPost = await Post.create({
        user_uuid: uuid,
        owner_name: name,
        post,
        media, comment: [], likes: []
      });
      return sendSuccessResponse(res, 200, { message: 'Post created successfully', newPost });
    } catch (error) {
      return sendErrorResponse(res, 500, 'An error occurred trying to create a post');
    }
  },

  // delete post 
  async deletePost(req, res) {
    try {
      const { uuid } = req.userData;
      const { post_uuid } = req.query;
      await Post.destroy({
        where: { uuid: post_uuid, user_uuid: uuid }
      });
      return sendSuccessResponse(res, 200, 'post deleted successfully');
    } catch (error) {
      return sendErrorResponse(res, 500, 'An error occurred while deleting post');
    }
  },

  // comment to a post
  async commentOnPost(req, res) {
    try {
      const { uuid, name } = req.userData;
      const { comment, post_uuid } = req.body;
      const post = await Post.findOne({
        where: { uuid: post_uuid }
      });
      if (!post) return sendErrorResponse(res, 404, 'post not found');
      await post.comment.push(
        {
          user_uuid: uuid,
          user_name: name,
          date_sent: new Date(),
          comment,
        });
      const [rowsAffected, [postUpdate]] = await Post.update(
        { comment: post.comment },
        {
          returning: true,
          where: { uuid: post_uuid },
        },
      );
      return sendSuccessResponse(res, 200, postUpdate);
    } catch (error) {
      return sendErrorResponse(res, 500, 'An error occurred commenting on the post');
    }
  },

  // like to a post
  async likePost(req, res) {
    try {
      const { uuid, name } = req.userData;
      const { like, post_uuid } = req.query;
      const post = await Post.findOne({ where: { uuid: post_uuid } });
      if (!post) return sendErrorResponse(res, 404, 'post not found');
      const likedBefore = post.likes.find((item) => item.user_uuid === uuid);
      if (likedBefore) return sendSuccessResponse(res, 200, 'already liked');
      await post.likes.push({
        user_uuid: uuid,
        user_name: name,
        like,
      });
      const [rowsAffected, [postUpdate]] = await Post.update(
        { likes: post.likes },
        {
          returning: true,
          where: { uuid: post_uuid },
        },
      );
      return sendSuccessResponse(res, 200, postUpdate);
    } catch (error) {
      return sendErrorResponse(res, 500, 'An error occurred while commenting on the post');
    }
  },

  // like to a post
  async unLikePost(req, res) {
    try {
      const { uuid } = req.userData;
      const { post_uuid } = req.query;
      const post = await Post.findOne({ where: { uuid: post_uuid } });
      if (!post) return sendErrorResponse(res, 404, 'post not found');
      const i = post.likes.findIndex((item) => item.user_uuid === uuid );
      await post.likes.splice(i, 1);
      const [rowsAffected, [postUpdate]] = await Post.update(
        { likes: post.likes },
        {
          returning: true,
          where: { uuid: post_uuid },
        },
      );
      return sendSuccessResponse(res, 200, postUpdate);
    } catch (error) {
      return sendErrorResponse(res, 500, 'An error occurred while commenting on the post');
    }
  },

  // list a user's posts

  async listUserPosts(req, res) {
    try {
      const { uuid } = req.userData;
      const posts = await helperMethods.getPostDetails({ user_uuid: uuid });
      return sendSuccessResponse(res, 200, posts);
    } catch (error) {
      return sendErrorResponse(res, 500, 'An error occurred while trying to list posts');
    }
  },

  // list a users post
  async listUserPostsByKey(req, res) {
    try {
      let posts;
      const { user_uuid, post_uuid } = req.query;
      if (req.query.post_uuid) posts = await helperMethods.getPostDetails({ uuid: post_uuid });
      else posts = await helperMethods.getPostDetails({ user_uuid });
      if (!posts.length) return sendErrorResponse(res, 409, 'No Post Found');
      return sendSuccessResponse(res, 200, posts);
    } catch (error) {
      return sendErrorResponse(res, 500, 'An error occurred while trying to list posts');
    }
  },

  //list platform post
  async listPosts(req, res) {
    try {
      const datas = await helperMethods.getPostDetails();
      return sendSuccessResponse(res, 200, datas);
    } catch (error) {
      return sendErrorResponse(res, 500, 'Aan error occured!!');
    }
  }
};

export default PostController;
