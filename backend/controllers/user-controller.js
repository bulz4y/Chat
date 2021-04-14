const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

const User = require('../models/user-model');

const HttpError = require('../models/error-model');

module.exports.getUsers = async (req, res, next) => {
    
    const id = req.params.id;

    let users;

    try {
        // users = await User.find({_id: {$ne: id}});
        users = await User.find();
    } catch(err) {
        return next(new HttpError('Failed to fetch users, please try again', 500));
    }

    res.status(200).json({
        users
    });
};



module.exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    let user;

    try {
        user = await User.findOne({username});
    } catch(err) {
        return next(new HttpError('Login failed, please try again.', 500));
    }


    if(!user) {
        return next(new HttpError('Invalid credentials.', 401));
    }

    let isValidPassword;

    try {
        isValidPassword = await bcrypt.compare(password, user.password);
    } catch(err) {
        return next(new HttpError('Login failed, please try again.', 500));
    }

  

    if(!isValidPassword) {
        return next(new HttpError('Invalid credentials.', 401));
    }

    let token;

    try {
        token = jwt.sign({ username, id: user._id }, process.env.secret);
    } catch(err) {
        return next(new HttpError('Login failed, please try again.', 500));
    }

    res.status(201).json({
        userId: user._id,
        username: user.username,
        token,
    });
};

module.exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return next(new HttpError('Invalid input passed please try again.', 422));
    }

    const username = req.body.username;
    const password = req.body.password;

   
    let user;

    try {
        user = await User.findOne({username});
   
    } catch(err) {
        return next(new HttpError('Signup failed please try again later', 500));
    }

    if(user) {
        return next(new HttpError("User already exists", 409));
    }

    
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch(err) {
        return next(new HttpError('Signup failed please try again later', 500));
    }
    

    const newUser = new User({
        username,
        password: hashedPassword
    });

    try {
        await newUser.save();
    } catch(err) {
        return next(new HttpError('Signup failed please try again later', 500));
    }

    try {
        token = jwt.sign({ username, id: newUser._id }, process.env.secret);
    } catch(err) {
        return next(new HttpError('Signup failed please try again later', 500));;
    }
    

    res.status(201).json({
        userId: newUser._id,
        username: newUser.username,
        token,
    });
};  