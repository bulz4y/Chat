const http = require('http');

require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const userRoutes = require('./routes/user-routes');
const chatRoutes = require('./routes/chat-routes.js');


const Message = require('./models/message-model');
const Conversation = require('./models/conversation-model');

const HttpError = require('./models/error-model');

const app = express();

// Socket IO

const server = http.createServer(app);


const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});


io.use((socket, next) => {
    const token = socket.handshake.auth.token.split(' ')[1];
  

    let decoded;
    try {
        decoded = jwt.verify(token, 'secret');
    } catch(err) {
       
        return next(new Error("Not Authenticated"));
    }

    socket.user = decoded;

    next();
  });

io.on('connection', (socket) => {
  

    socket.join(socket.user.id);

    socket.on('private message', (data) => {
        
        const insertMessage = async () => {
            let conversation;
            let filter;

         

            if (data.to !== data.from) {
                filter = { users: {$all: [new mongoose.Types.ObjectId(data.to.toString()), new mongoose.Types.ObjectId(data.from.toString())]}};
               
            } else {
                filter = { users: {$size: 1, $all: [new mongoose.Types.ObjectId(data.to.toString())] }};
            }


            try {
                conversation = await Conversation.findOne(filter);
            } catch(err) {
                throw new Error(err.message);
            }


            // Create new conversation if one doesnt exist already
            if(!conversation) {
                    if(data.to !== data.from) {
                        conversation = new Conversation({
                            users: [new mongoose.Types.ObjectId(data.to), new mongoose.Types.ObjectId(data.from)]
                        });
                    } else {
                        conversation = new Conversation({
                            users: [new mongoose.Types.ObjectId(data.to)]
                        });
                    }

                    await conversation.save();
                    
            }

            let message = new Message({
                body: data.content,
                userId: data.from,
                conversationId: conversation._id
            });

            let newMessage;
            try {
                newMessage = await message.save();
                newMessage = await newMessage.populate('userId').execPopulate();
            } catch(err) {
                throw new Error(err.message);
            }


            socket.emit('private message', newMessage);
            socket.to(data.to).emit('private message', newMessage);
        }

        insertMessage();

        
    });
    
});

// set body parser
app.use(bodyParser.json());


// set cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization");
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');

    next();
});


// Routes
app.use('/api', userRoutes);
app.use('/api', chatRoutes);


// Error Handler
app.use((error, req, res, next) => {
    res.status(error.statusCode).json({
        message: error.message
    });
});





mongoose.connect(process.env.MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then((res) => {
        // app.listen(5000);
        server.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    })
