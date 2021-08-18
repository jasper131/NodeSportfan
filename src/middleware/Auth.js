import { verifyToken } from '../utils/processToken';
import { sendErrorResponse } from '../utils/sendResponse';
import model from '../models';

const { User, Profile } = model;

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
	try {
		if (!req.headers.authorization) return sendErrorResponse(res, 401, 'Authentication required');
		const token = req.headers.authorization.split(' ')[1] || req.headers.authorization || req.headers.cookie.split('=')[1];
		if (!token) return sendErrorResponse(res, 401, 'Access denied!');
		const { email } = verifyToken(token);
		const user = await User.findOne({
			where: { email },
			attributes: {
				exclude: [
					'password'
				]
			},
			include: [
				{
					model: Profile,
					as: 'profiles'
				}
			]
		});
		if (!user) return sendErrorResponse(res, 401, 'User does not exist');
		req.token = token;
		req.userData = user.dataValues;
		next();
	} catch (err) {
		const error =
			err.message ? 'Authentication Failed' :
			err;
		next(error);
	}
};
