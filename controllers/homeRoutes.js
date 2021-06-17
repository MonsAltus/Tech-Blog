const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts with their comments for homepage.
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {model: User, attributes: ['name']},
                {model: Comment, attributes: ['content', 'date_created', 'user_id']}
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true}));

        res.render('homepage', {
            posts,
            loggedIn: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get one post and its comments by Id, requires user to be logged in.
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {model: User, attributes: ['name']},
                {model: Comment, attributes: ['content', 'date_created', 'user_id']}
            ]
        });
        const post = postData.get({plain: true});

        res.render('post', {
            ...post,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all users posts for dashboard, requires user to be logged in.
router.get('/dashboard', withAuth, async (req, res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [
                {model: User, attributes: ['name']},
                {model: Comment, attributes: ['content', 'date_created', 'user_id']}
            ]
        });
        const user = userData.get({plain: true})

        res.render('dashboard', {
            ...user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add new post
router.get('/addpost', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    };
    res.render('addpost');
});

// Log in
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    };
    res.render('login');
});

module.exports = router;
