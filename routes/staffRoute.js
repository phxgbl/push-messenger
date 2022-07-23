const express = require('express');
const staffRouter = express.Router();
const staffController = require('../controllers/staffController');
const config = require('config');

const settings = config.get('settings');

staffRouter.get('/', async (req, res, next) => {
	const staff = await staffController.getStaffById(req.session.userId);
	if (!staff) {
		res.redirect('/login');
        return;
	} 
    const staffs = await staffController.getAllstaffs();
    return res.render('staffs.ejs', { staffs: staffs });


});

staffRouter.post('/uploadFile',  (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    dataFile = req.files.data;
    uploadPath = settings.file.uploadLocation + dataFile.name;
    let isDataLoaded;
    dataFile.mv(uploadPath, (err) => {
        if (err) { return res.status(500).send(err); }
    });
    isDataLoaded = staffController.uploadStaffData(uploadPath);
    if (!isDataLoaded) {
        return res.redirect('/staffs');
    }
    return res.redirect('/staffs');
})

staffRouter.get('/upload', (req, res, next) => {
    return res.render('staffUpload.ejs');
})

//Increment contact route
staffRouter.get('/incrementContact/:userId', (req, res, next) => {
    const hasIncrementedContact=customerController.incrementContact(req.params.userId);
    if(!hasIncrementedContact){
        //change wih error page
        return res.redirect('/customers');    
    }
    return res.redirect('/customers');
})

module.exports = staffRouter;

