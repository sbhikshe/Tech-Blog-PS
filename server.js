const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

/* Routes */
const routes = require('./controllers');

/* Import the sequelize object */
const sequelize = require('./config/connection');

/* For routes */
app.use(routes);

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Sync models to the database, then start the server listening */
sequelize.sync()
.then ( () => {
  app.listen(PORT, () => console.log("Server listening on port " + PORT));
}
);

