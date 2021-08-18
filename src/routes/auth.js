import express from 'express';
import AuthController from './../controllers/AuthController';
import Auth from './../middleware/Auth';

const userRouter = express.Router();

const {
  signup,
  signin,
  me,
  verifyUser,
  forgetPassword,
  verifyPasswordLink,
  resetPassword,
  updateUser,
  setPassword,
  getNewEmailToken,
  getAllUserUsernameAndEmail,
  refreshToken
} = AuthController;

userRouter.post(`/signup`, signup);
userRouter.post(`/signin`, signin);
userRouter.get(`/me`, Auth, me);
userRouter.get(`/verification/:token/:email/:id`, verifyUser);
userRouter.post(`/forgetpassword`, forgetPassword);
userRouter.get(`/verifypassword/:token/:email/:id`, verifyPasswordLink);
userRouter.post(`/setpassword`, Auth, setPassword);
userRouter.patch(`/resetpassword`, Auth, resetPassword);
userRouter.patch(`/updateprofile`, Auth, updateUser);
userRouter.post(`/refresh-email-token`, getNewEmailToken);
userRouter.get(`/form/validations`, getAllUserUsernameAndEmail);
userRouter.get(`/refreshToken`, Auth, refreshToken); // token||email = []

export default userRouter;
