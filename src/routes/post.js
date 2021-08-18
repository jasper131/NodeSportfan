import express from 'express';
import Auth from './../middleware/Auth';
import PostController from './../controllers/PostController';
// import upload from './../utils/multer-config'

const {
  createPost,
  deletePost,
  commentOnPost,
  likePost,
  unLikePost,
  listUserPosts,
  listPosts
} = PostController;

const router = express.Router();
router.post('/create-post', Auth, createPost);
router.delete('/delete-post', Auth, deletePost); // ?post_uuid
router.patch('/comment-post', Auth, commentOnPost); 
router.patch('/like-post', Auth, likePost); // ?post_uuid
router.patch('/unlike-post', Auth, unLikePost); // ?post_uuid
router.get('/list-user-posts', Auth, listUserPosts); 
router.get('/list-posts', Auth, listPosts);

export default router;
