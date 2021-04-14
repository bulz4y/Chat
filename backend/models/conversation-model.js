const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
   users: [{
       type: Schema.Types.ObjectId,
       required: true,
       ref: 'user'
   }]
});

module.exports = mongoose.model('conversation', conversationSchema);