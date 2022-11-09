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
        // TBD: possibly exclude this ? Show only the posts?
        {model: PostComment,
        attributes: [
          'contents',
          // created by - some other user !!
        ]}
      ]
    });
    //console.log("Postdata = " + postData);
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
    res.render('login');
  } else {
  /* find the user that's logged in */
  /* req.session.userId */
  /* findAll posts by that user */
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
  //console.log(postData);
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
    // do nothing? Stay on the same page?
  }
});

/*
router.get('/post', async (req, res) => { 
  console.log("Received get req to localhost:3001/post")
  if(req.session.loggedIn) {
    console.log("Showing createPost box");
    res.render('./createPost', {loggedIn: req.session.loggedIn});
  } else {
    console.log("not logged in, can't create post")
    res.render('login');
  }
});
*/

module.exports = router;

