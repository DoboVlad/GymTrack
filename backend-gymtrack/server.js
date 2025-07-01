const express = require("express");
const cors = require('cors');
const app = express();
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const sequelize = require("./config/database");

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json()); // for parsing application/json

app.use("/api/users", userRoutes);
app.use("/api/workout", workoutRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected!");
    return sequelize.sync(); // Ensure models are synced
  })
  .then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
