
const express = require('express');
const router = express.Router();

const user = require('../controllers/user.js');

router.post('/signin', user.signIn);
router.post('/signup', user.signUp);

module.exports = router;