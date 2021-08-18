var express = require('express');
const RoomController  = require('../controllers/RoomController');
const { NewsController } = require('../controllers/NewsController');
const UserController = require('../controllers/UserController');
var router = express.Router();

/* register all pages */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'FIFA FANS', style: 'style.css' });
});

// this is the about page
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'FIFA FANS', style: 'style.css' });
});

//this is the signup page

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'FIFA FANS', style: 'style.css' });
});

//this is login page
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'FIFA FANS', style: 'style.css', style: 'style.css' });
});

// //this is verify page
router.get('/verify-message', function(req, res, next) {
    res.render('verify', { message: 'Kindly Verify Account To Log In, Thanks!!' });
});


//this is login page
router.get('/editprofile', function(req, res, next) {
    res.render('editprofile', { title: 'FIFA FANS', style: 'style.css' });
});

//this is login page
router.get('/forgetpassword', function(req, res, next) {
    res.render('forgetpassword', { title: 'FIFA FANS', style: 'style.css' });
});

//this is change password page
router.get('/changepassword', function(req, res, next) {
    res.render('changepassword', { title: 'FIFA FANS', style: 'style.css' });
});

//this is about user page
router.get('/aboutuser', function(req, res, next) {
    res.render('aboutuser', { title: 'FIFA FANS', style: 'style.css' });
});

//this is contact info page
router.get('/usercontactinfo', function(req, res, next) {
    res.render('usercontactinfo', { title: 'FIFA FANS', style: 'style.css' });
});

//this is profile page
router.get('/profile', function(req, res, next) {
    res.render('profile', { title: 'FIFA FANS', style: 'style.css' });
});
//this is profile page
// router.get('/friendprofile', function(req, res, next) {
//     res.render('friendprofile', { title: 'FIFA FANS', style: 'style.css' });
// });

//this is profile page
router.get('/forgetpass_verification', function(req, res, next) {
    res.render('forgetpass_verification', { title: 'FIFA FANS', style: 'style.css' });
});

// for notification page
router.get('/notification', function(req, res, next) {
    res.render('notification', { title: 'FIFA FANS', style: 'style.css' });
});

//this is message page
router.get('/message', function(req, res, next) {
    res.render('message', { title: 'FIFA FANS', style: 'style.css' });
});

//this is readnews page
// router.get('/readnews', function(req, res, next) {
//     res.render('readnews', { title: 'FIFA FANS', style: 'style.css' });
// });

//this is the room route
router.get('/room', RoomController.default.getGroupChats);

// this gets the user detail
router.get('/friendprofile', UserController.default.viewUserDetails);

// this is the news route
router.get('/news', NewsController.getNews);

//this is message page
router.get('/roommessagebox', function(req, res, next) {
    res.render('roommessagebox', { title: 'FIFA FANS', style: 'style.css'});
});

//this is message page
// router.get('/news', function(req, res, next) {
//     res.render('news', { title: 'FIFA FANS', style: 'style.css' });
// });
router.get('/view-news', NewsController.viewNew);


router.get('/view-user-details', NewsController.viewNew);


// for rooms page
router.get('/rooms', function(req, res, next) {
    res.render('rooms', { title: 'FIFA FANS', style: 'style.css' });
});

// for create room page
router.get('/create_room', function(req, res, next) {
    res.render('create_room', { title: 'FIFA FANS', style: 'style.css' });
});

router.get('/view-news', NewsController.viewNew)



module.exports = router;