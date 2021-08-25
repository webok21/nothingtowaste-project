// const express = require('express');
// const router = express.Router();

// const user = require('../controllers/user.js');

// router.post('/signin', user.signIn);
// router.post('/signup', user.signUp);

// module.exports = router;

const express = require('express');
const router = express.Router()


const authCheck = (req, res, next) => {
    // console.log(req)
    if (!req.user) {
        res.redirect('/auth/login')
    } else {
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    // res.render('profile')
    console.log("Profile:", req.user);
    res.render('profile', { newItems1: req.user })
})

module.exports = router