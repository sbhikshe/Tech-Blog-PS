const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

/* Import the sequelize object */
const sequelize = require('./config/connection');

/* Sync models to the database, then start the server listening */
sequelize.sync()
.then ( () => {
  app.listen(PORT, () => console.log("Server listening on port " + PORT));
}
);

