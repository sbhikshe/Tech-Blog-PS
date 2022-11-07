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
          // created by - some other user !!
        ]}
      ]
    });
    console.log("Postdata = " + postData);
    if (postData) {
      const posts = postData.map((post) => post.get({plain: true}));
      //const postDataToRender = posts.map((post) => {});
      //res.status(200).json(posts);
      res.render('homepage', { posts } );
    } else {
      res.status(400).json("Error reading posts from Db");
    }
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/signup', async (req, res) => {
  console.log("Received get req to localhost:3001/signup")
  res.render('signup');
});

router.get('/login', async (req, res) => { 
  console.log("Received get req to localhost:3001/login")
  res.render('login');
});

module.exports = router;

