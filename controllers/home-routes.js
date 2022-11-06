const router = require('express').Router();
const Post  = require('../model/Post');

/* send the homepage */
router.get('/', async (req, res) => {
  /* Get the posts from the db */
  console.log("Received get req to localhost:3001/")
  try {
  const postData = await Post.findAll();
  console.log("Postdate = " + postData);
  if (postData) {
    const posts = postData.map((post) => post.get({plain: true}));
    res.status(200).json(posts);
    // res.render('homepage', { posts } );
  } else {
    res.status(400).json("Error reading posts from Db");
  }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => { 
  res.render('login');
});

module.exports = router;

