const router = require('express').Router();
const { Post, User, PostComment } = require('../../model');


/* find all posts and return */
router.get('/', async (req, res) => {
  console.log("received get req to /api/posts");
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User
        }
      ]
    });    if(postData) {
      res.status(200).json(postData);
    } else {
      res.status(400).json("Posts not retrieved");
    }
  } catch(err) {
    res.status(500).json(err);
  }

});

/* find the post with this id */
router.get('/:id', async (req, res) => {
  console.log("received get req to /api/posts/:id");
  try {
    const postData = await Post.findByPk(
      {
        where: {
          id: req.params.id
        }
      }
    );
    if(postData) {
      res.status(200).json(postData);
    } else {
      res.status(400).json("Posts not retrieved");
    }
  } catch(err) {
    res.status(500).json(err);
  }
});

/* create a new post */
router.post('/', async (req, res) => {
  console.log("received post req to /api/posts");
  try {
    console.log("Request: " + req.body.title + " " + req.body.contents);
    /* create a new post with the title and contents from the POST req */
    const post = await Post.create({
      title: req.body.title,
      contents: req.body.contents,
      createdBy: req.session.userId,
      postedAt: Date.now()
    });

    if (post) {
      console.log("Post created" + post);
      res.status(200).json(post);
    } else {
      res.status(400).json("Post not created");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

/* update a post */
router.put('/:id', async (req, res) => {

  console.log("received update req to /api/posts/:id" + req.params.id);
  try {
    console.log("Request: " + req.body.title + " " + req.body.contents);

    /* find the post with id received in the req and 
    update with the title and contents from the PUT req */
    const post = await Post.update(
      {
        title: req.body.title,
        contents: req.body.contents,
        createdBy: req.body.createdBy,
        postedAt: Date.now()
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (post) {
      console.log("Post updated" + post);
      res.status(200).json(post);
    } else {
      res.status(400).json("Post not updated");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

/* delete a post */
router.delete('/:id', async (req, res) => {
  console.log("received delete req to /api/posts/:id" + req.params.id);
  try {
    const post = await Post.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(400).json("Post not deleted");
    }

  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('*', (req, res) => console.log("REceived wildcard get"));
router.post('*', (req, res) => console.log("Received wildcard post"));

module.exports = router;