const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.get('/', async (req, res, next)  => {

	const staff = await staffController.getStaffById(req.session.userId);
	if (!staff) {
		res.redirect('/login');
		return;
	} 
	res.redirect('/staffs');

});

router.get('/login', async (req, res, next) => {

	const staff = await staffController.getStaffById(req.session.userId);
	if (!staff) {
		return res.render('login.ejs');
	} 
	res.redirect('/staffs');
	
});


router.post('/login', async (req, res, next) => {

	const staff = await staffController.getStaffByEmail(req.body.email);

	if (staff) {

		if (staff.password == req.body.password) {
			req.session.userId = staff.id;
			res.send({ "Success": "Success!" });
		} else {
			res.send({ "Success": "Wrong password!" });
		}
	} else {
		res.send({ "Success": "This Email Is not regestered!" });
	}
});

router.get('/profile', async (req, res, next) => {

	const staff = await staffController.getStaffById(req.session.userId);
	if (!staff) {
		res.redirect('/login');
	} else {
		return res.render('userProfile.ejs', { "name": staff.fullname, "email": staff.email });
	}
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