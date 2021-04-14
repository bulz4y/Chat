const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    
    conversationId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('message', messageSchema);