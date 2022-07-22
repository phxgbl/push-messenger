const express = require('express');
const customerRouter = express.Router();
const customerController = require('../controllers/customerController');

customerRouter.get('/', async (req, res, next) => {
    const customers = await customerController.getAllCustomers();
	return res.render('customer.ejs',{customers:customers});
});

module.exports = customerRouter;

