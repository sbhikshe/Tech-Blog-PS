const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../model');

/* create a new user / signup */
router.post('/', async (req, res) => {
  console.log("received post req to /api/users");
  try {

    console.log("Request: " + req.body.username + " " + req.body.password);

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const userData = await User.create({
      username: req.body.username,
      password: passwordHash,
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
router.post('/login', async (req, res) => {
  try {
    /* get hashed password for this user  */
    const storedPassword = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if(storedPassword) {
      /* check against user input password in the request */
      const isValid = await bcrypt.compare(req.body.password, storedPassword.password);
      if(isValid) {
        res.send("user logged in");
        // render this user's dashboard
      } else {
        console.log("Invalid password");
        res.status(400).json("Invalid password");
        //render('homepage');
      }
    } else {
      res.status(400).json("User not found");
    }
  } catch (err) {
    res.status(400).json(err);
  } 
});

/* when the user logs out */
router.post('/logout', (req, res) => {

});

module.exports = router;