const mongoose = require('mongoose');

const Conversation = require('../models/conversation-model');
const Message = require('../models/message-model');

const HttpError = require('../models/error-model');

module.exports.getMessages = async (req, res, next) => {
    const user1 = req.params.id;
    const user2 = req.userData.userId;

    let filter;
    if(user1 === user2) {
        filter = {users: {$size: 1, $all: [new mongoose.Types.ObjectId(user1)]}};
    } else {
        filter = {users: {$all: [new mongoose.Types.ObjectId(user1), new mongoose.Types.ObjectId(user2)]}};
    }

    

    let conversation;

    try {
        conversation = await Conversation.findOne(filter);
    } catch(err) {
        return next(new HttpError('Something went wrong, please try again', 500));
    }

    

    if(!conversation) {
        return res.status(200).send({
            messages: []
        })
    }

    let messages;

    try {
        messages = await Message.find({conversationId: conversation._id}).populate('userId');
    } catch(err) {
        return next(new HttpError('Something went wrong, please try again', 500));
    }

    

    res.status(200).send({
        messages
    });
};

module.exports.getConversations = async (req, res, next) => {

    const userId = req.params.id;

    let conversations;

    try {
        

        conversations = await Conversation.find({users: {$eq: new mongoose.Types.ObjectId(userId)}}).populate('users', '-password');
       
        // conversations = await conversations.aggregate([{$project: {users: {
        //     $filter: {
        //         input: "$users",
        //         as: "users",
        //         cond: {$ne: ["$$users", new mongoose.Types.ObjectId(userId)]}
        //     }}
        // }}])
    } catch(err) {
        console.log(err);
        return next(new HttpError('Something went wrong, please try again', 500));
    }

    res.status(200).send({
        conversations
    });
};