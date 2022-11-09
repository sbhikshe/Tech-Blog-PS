const router = require('express').Router();
const { PostComment } = require('../model');
const Post  = require('../model/Post');
const User = require('../model/User');

/* send the homepage */
router.get('/', async (req, res) => {
  /* Get the posts from the db */
  console.log("Received get req to localhost:3001/")
  try {
    const postData = await Post.findAll({
      include: [
        {model: User,
        attributes: [
          'username'
        ]}, 
        {model: PostComment,
        attributes: [
          'contents',
        ]}
      ]
    });
    if (postData) {
      const posts = postData.map((post) => post.get({plain: true}));
      res.render('homepage', { posts } );
    } else {
      res.status(400).json("Error reading posts from Db");
    }
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
  console.log("Logged in, showing dashboard");
  if(!req.session.loggedIn) {
    res.render('signup');
  } else {
  /* find the user that's logged in */
  /* req.session.userId */
  /* find all posts by that user */
  console.log("User logged in now = " + req.session.userId);
  const postData = await User.findByPk(req.session.userId, {
    include: [
      { model: Post }, 
      { 
        model: PostComment,
        attributes: [
        'contents',
        ]
      }],
  });
  if(postData) {
    const data = postData.get({plain: true});
    console.log("data = " + data);
    res.render('dashboard', { posts: data.posts, loggedIn: req.session.loggedIn });
  } else {
    /* if no posts, show "No posts for this user" */
    res.render('dashboard',{posts: null, loggedIn: req.session.loggedIn})
  }
  }
});

router.get('/signup', async (req, res) => {
  console.log("Received get req to localhost:3001/signup")
  if(req.session.loggedIn) {
    res.redirect('/dashboard');
  } else {  
    res.render('signup');
  }
});

router.get('/login', async (req, res) => { 
  console.log("Received get req to localhost:3001/login")
  if(req.session.loggedIn) {
    res.redirect('/dashboard');
  } else {
    res.render('login');
  }
});

router.get('/logout', (req, res) => {
  console.log("Received get req to localhost:3001/logout")
  if(req.session.loggedIn){
    req.session.destroy(() => {
      res.render('logout');
    });
  } else {
    console.log("received logout when no one is logged in");
  }
});

router.get('/updatePost/:id', async (req, res) => {
  console.log("received req to update post: " + req.params.id);
  try {
    const postData = await Post.findByPk(req.params.id);
    if(postData) {
      const post = postData.get({plain: true});
      res.render('updatePost', { post });
    } else {
      res.status(400).json("Didn't find post");
    }
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
