const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controllers/messageController');
const config = require('config');

const settings = config.get('settings');

messageRouter.get('/',async (req, res, next) => {
    const messages = await messageController.getAllMessages();
    return res.render('messages.ejs',{messages:messages})
});

messageRouter.get('/createMessageForm',  async (req, res, next) => {
    return res.render('createMessage.ejs');
});

messageRouter.post('/createMessage',  async (req, res, next) => {
    if(req.body){
        const message = await messageController.createMessage(req.body)
        return res.redirect('/messages')
    }
    return res.redirect('/createMessageForm', { customers: customers });
});

module.exports = messageRouter;