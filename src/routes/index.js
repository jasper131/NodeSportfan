import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import postRoutes from './post';
import roomRoutes from './room';
import chatRoutes from './chats'

const router = Router();

// router.use('/', (req, res) =>
// res.status(200).send({
//     status: 'success',
//     data: 'Welcome to Fifa Fans API'
// }));
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/room', roomRoutes);
router.use('/chat', chatRoutes);


export default router;
