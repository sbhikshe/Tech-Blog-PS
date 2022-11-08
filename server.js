const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
const routes = require('./controllers');

/* Import the sequelize object */
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

/* Handlebars */
const expressHandlebars = require('express-handlebars');
const hbs = expressHandlebars.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/* Handling sessions */
const sessionOptions = {
  secret: 'ASecretTechBlog',
  cookie: {
    maxAge: 300000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sessionOptions));

/* For routes */
app.use(routes);

/* Sync models to the database, then start the server listening */
sequelize.sync()
.then ( () => {
  app.listen(PORT, () => console.log("Server listening on port " + PORT));
}
);

