const MessageModel = require('../models/message');

const getAllMessages = async ()=>{
    const messages = await MessageModel.find();
    return messages;
}

const getMessageById = async(messageId)=>{
    const message = await MessageModel.findById(messageId)
    return message;
}

const createMessage = async (message)=>{
    const message = await MessageModel.create(message);
    return message;
}

const updateMessage = async (messageId,updatedMessage)=>{
    const message = await MessageModel.findByIdAndUpdate(messageId,updateMessage,{
        new:true,
        runValidators:true
    })
    return message;
}

const deleteBook = async(messageId)=>{
    await MessageModel.findByIdAndDelete(messageId);
    return {};
}