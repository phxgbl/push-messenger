const CustomerModel = require('../models/customer');

const getAllCustomers= async ()=>{
    try{
        const customerData = await CustomerModel.find();
        return customerData
    }catch(err){
        console.log(err);
        return {};
    }
    
}

const customerController = {
    getAllCustomers
}

module.exports = customerController;