const express = require('express');

const isAuth = require('../middleware/isAuth');

const chatController = require('../controllers/chat-controller');

const router = express.Router();


router.get('/conversations/:id', chatController.getConversations);
router.get('/messages/:id', isAuth, chatController.getMessages);

module.exports = router;