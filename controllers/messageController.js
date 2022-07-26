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
    const newMessage = await MessageModel.create(message);
    return newMessage;
}

const updateMessage = async (messageId,updatedMessage)=>{
    const message = await MessageModel.findByIdAndUpdate(messageId,updateMessage,{
        new:true,
        runValidators:true
    })
    return message;
}

const deleteMessage = async(messageId)=>{
    await MessageModel.findByIdAndDelete(messageId);
    return {};
}

const messageController = {
    createMessage,
    updateMessage,
    deleteMessage,
    getAllMessages,
    getMessageById
}

module.exports = messageController;