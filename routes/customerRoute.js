const express = require('express');
const customerRouter = express.Router();
const customerController = require('../controllers/customerController');
const config = require('config');

const settings = config.get('settings');

customerRouter.get('/', async (req, res, next) => {
    const customers = await customerController.getAllCustomers();
    return res.render('customer.ejs', { customers: customers });
});

customerRouter.post('/uploadFile', (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    dataFile = req.files.data;
    uploadPath = settings.file.uploadLocation + dataFile.name;
    let isDataLoaded;
    dataFile.mv(uploadPath, (err) => {
        if (err) { return res.status(500).send(err); }
    });
    isDataLoaded = customerController.uploadUserData(uploadPath);
    if (!isDataLoaded) {
        return res.redirect('/customers', { status: 500, error: "DB", message: "could not load data to db" });
    }
    return res.redirect('/customers');
})

customerRouter.get('/upload', (req, res, next) => {
    return res.render('customerUpload.ejs');
})

module.exports = customerRouter;

