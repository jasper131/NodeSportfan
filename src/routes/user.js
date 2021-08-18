import express from 'express';
import UserController from './../controllers/UserController';
import FollowerController from './../controllers/FollowerController';
import PostController from './../controllers/PostController';
import Auth from './../middleware/Auth';

const router = express.Router();

const {
  searchUsers,
  viewUserDetails,
} = UserController;
const {
  listUserPostsByKey
} = PostController;
const {
  followUser,
  listUserFollowers,
  CheckFollowUser,
  unFollowUser
} = FollowerController;

router.get('/search-user', searchUsers); // ?input=[]
router.get('/view-user-details', Auth, viewUserDetails); // ?user_uuid=[]&my_uuid=[]
router.post('/follow-user', Auth, followUser); // ?user_uuid=[]
router.get('/list-followers', Auth, listUserFollowers);
router.get('/check-if-follow', Auth, CheckFollowUser);  // ?user_uuid=[]
router.patch('/un-follow-user', Auth, unFollowUser); // ?user_uuid=[]
router.get('/post', Auth, listUserPostsByKey); // ?user_uuid=[]&post_uuid

export default router;