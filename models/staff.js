const mongoose = require('mongoose')
const {isEmail} = require('validator')

const staffSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:[true,'Staff name is required']
    },
    email:{
        type:String,
        required:[true,'Staff email is required'],
    },
    mobile:{
        type:String,
        required:[true,'Staff mobile is required']
    },
    password: {
        type:String,
    },
    login_enabled:{
        type:Boolean,
        required:[true,'login_enabled is required']
    },
    role:{
        type:String,
        required:[true,'A Staff role is required']
    },
    contacted:Number
})

const Staff = mongoose.model('Staff',staffSchema)

module.exports = Staff;