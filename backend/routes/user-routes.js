const express = require('express');

const { check } = require('express-validator');

const userController = require('../controllers/user-controller');

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup',     
            [
                check('username')
                    .trim()
                    .not().isEmpty()
                    .isLength({min: 5}),
                check('password')
                    .trim()
                    .not().isEmpty()
                    .isLength({min: 5}),
                check('confirmPassword')
                    .custom((confirmPassword, {req}) => {
                        if(confirmPassword !== req.body.password) {
                            throw new Error("Passwords do not match");
                        }

                        return true;
                    })

            ],  
            userController.signup);


router.get('/users/:id', userController.getUsers);

module.exports = router;