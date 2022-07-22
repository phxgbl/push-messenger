const mongoose = require('mongoose')
const {isEmail} = require('validator')

const customerSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:[true,'Customer name is required']
    },
    email:{
        type:String,
        required:[true,'Customer email is required'],
    },
    mobile:{
        type:String,
        required:[true,'Customer mobile is required']
    }
})

const Customer = mongoose.model('Customer',customerSchema)

module.exports = Customer;