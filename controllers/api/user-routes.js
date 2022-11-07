const router = require('express').Router();
const { User } = require('../../model');

/* create a new user / signup */
router.post('/', async (req, res) => {
  console.log("received post req to /api/users");
  try {
    console.log("req.method" + req.method);
    console.log("req.headers" + req.headers);
    console.log("req.body" + req.body);

    console.log("Request: " + req.body.username + " " + req.body.password);
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password, // TBD: brcypt the password before storing
    });

    if (userData) {
      console.log("User created" + userData);
      const data = userData.get({plain: true});
      res.status(200).json({"id": data.id, "username": data.username});
    } else {
      res.status(400).json("User not created");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

/* when the user logs in */
router.post('/login', (req, res) => {
  // check password
  res.send("user logged in");
});

/* when the user logs out */
router.post('/logout', (req, res) => {

});

module.exports = router;