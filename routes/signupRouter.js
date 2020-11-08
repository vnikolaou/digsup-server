'use strict';

const express = require('express');
const signupService = require('../services/signupService');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.json([{email:'vnik1@gmail.com'}, {email:'vnik2@gmail.com'}]);
});

router.put('/process', async (req, res, next) => {
    console.log('Invoking PUT /api/signup/process');
    try {
        const results = await signupService.processEmails();
        res.json(results); 
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'An error occured during processing emails' });
    }    
});

router.post('/', async (req, res, next) => {
    console.log('Invoking POST /api/signup');
    try {
        const result = await signupService.persistEmail(req.body.email);
        if(result) {
            res.json({ message: 'The email was registered' });
        } else {
            res.status(400).json({ message: 'The email has already been registered' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'An error occured during persisting email' });
    }    
});

module.exports = router;
