import dotEnv from 'dotenv';
import { transporter } from '../config/nodemailer-config';

dotEnv.config();
const SendMail = (to, token, id) => {
	const hostUrl = `${process.env.HOST_URL}`;
	const mailOptions = {
		from: 'admin@fifafans.club',
		to,
		subject: 'Welcome To Fifa Fans',
		text: `Hi, \n\nThank You For Fifa Fans \nClick on this link to verify your email ${hostUrl}/auth/verification/${token}/${to}/${id}`
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			return 'error sending verification';
		}
		console.log(`Email sent: ${info.response}`);
	});
};

const sendForgotPasswordMail = (to, token, id) => {
	const hostUrl = `${process.env.HOST_URL}`;
	const mailOptions = {
		from: 'admin@fifafans.club',
		to,
		subject: 'Your Password Reset Link is Here',
		text: `Hi, \n\nThis Link expires in the next 1 hour\nClick on this link to reset your password ${hostUrl}/auth/verifypassword/${token}/${to}/${id}`
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return 'error sending verification';
		}
		console.log(`Email sent: ${info.response}`);
	});
};

const SendAnyMail = (to, subject, message) => {
	const mailOptions = {
		from: 'admin@fifafans.club',
		to,
		subject,
		text: `${message}, \n check your profile or dashboard to see the details \n Let us build wealth together`
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return 'error sending verification';
		}
		console.log(`Email sent: ${info.response}`);
	});
};

export { SendMail, sendForgotPasswordMail, SendAnyMail };
