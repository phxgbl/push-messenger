const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');

router.get('/', (req, res, next) => {
//	return res.render('index.ejs');


Staff.findById(req.session.userId, (err, data) => {
	if (err  || !data ) {
		res.redirect('/login');
	} else {
		res.redirect('/staffs');
		//return res.render('userProfile.ejs', { "name": data.fullname, "email": data.email });
	}
});

});

router.get('/login', (req, res, next) => {
	return res.render('login.ejs');
});


router.post('/login', (req, res, next) => {
	Staff.findOne({ email: req.body.email }, (err, data) => {
		if (data) {

			if (data.password == req.body.password) {
				req.session.userId = data.id;
				res.send({ "Success": "Success!" });
			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});

router.get('/profile', (req, res, next) => {
	Staff.findById(req.session.userId, (err, data) => {
		if (err  || !data ) {
			res.redirect('/');
		} else {
			return res.render('userProfile.ejs', { "name": data.fullname, "email": data.email });
		}
	});
});

router.get('/logout', (req, res, next) => {
	if (req.session) {
		// delete session object
		req.session.destroy((err) => {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

module.exports = router;