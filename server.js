const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
const routes = require('./controllers');

/* Import the sequelize object */
const sequelize = require('./config/connection');

/* Handlebars */
const expressHandlebars = require('express-handlebars');
const hbs = expressHandlebars.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/* For routes */
app.use(routes);

/* Sync models to the database, then start the server listening */
sequelize.sync()
.then ( () => {
  app.listen(PORT, () => console.log("Server listening on port " + PORT));
}
);

