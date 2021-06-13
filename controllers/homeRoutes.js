const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// const withAuth = require('../utils/Auth');

// Get all posts for homepage
router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll()


        const posts = postData.map((post) => post.get({ plain: true}));

        res.render('homepage', {
            posts,
            loggedIn: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Get one post and comments by Id ---- (withAuth)


// Get users posts for dashboard ---- (withAuth)


// Log in
router.get('/login', (req,res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    };
    res.render('login');
});

module.exports = router;
