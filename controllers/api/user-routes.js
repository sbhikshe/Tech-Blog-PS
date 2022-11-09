const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../model');

/* create a new user / signup */
router.post('/', async (req, res) => {
  console.log("received post req to /api/users");
  try {

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const userData = await User.create({
      username: req.body.username,
      password: passwordHash,
    });

    if (userData) {
      console.log("User created" + userData);
      /* save to session store - new user id and logged in status */
      req.session.save(() => {
        req.session.userId = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

      /* Send response back to client */
      const data = userData.get({plain: true});
      res.status(200).json(data);
      });
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
    const userData = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if(userData) {
      /* check against user input password in the request */
      const isValid = await bcrypt.compare(req.body.password, userData.password);
      if(isValid) {
        /* save to session store - new user id and logged in status */
        req.session.save(() => {
          req.session.userId = userData.id;
          req.session.username = req.body.username;
          req.session.loggedIn = true;
  
          const data = userData.get({plain: true});
          res.status(200).json({"id": data.id, "username": data.username});
          // render this user's dashboard
        });
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

module.exports = router;