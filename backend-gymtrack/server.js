const express = require("express");
const app = express();
const PORT = 3000;
const userRoutes = require("./routes/userRoutes");

app.use(express.json()); // for parsing application/json

app.use("/api/users", userRoutes);
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
