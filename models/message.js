const mongoose = require('mongoose')

const messageSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,'Message title is required']
    },
    body:{
        type:String,
        required:[true,'Message body is required']
    },
    createdAt: {
		type: Date,
		default: Date.now
	}
})

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;