const userService = require("../services/userService");
const { mapUserPayload, mapUserToViewModel } = require("../mapper/userMapper");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const payload = mapUserPayload(req.body.user);
    const user = await userService.registerUser(payload);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Error registering user", err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.authenticateUser(email, password);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION || "1h" }
  );
  res.json({
    token,
    user: { id: user.id, email: user.email, first_name: user.first_name },
  });
};

exports.getLoggedInUser = async (req, res) => {
  const userId = req.user.userId; // Assuming req.user is set by auth middleware
  if (!userId) return res.status(400).json({ message: "No such user exist" + userId });

  const user = await userService.getUserById(userId);

  let userViewModel = mapUserToViewModel(user);
  res.json({ user: userViewModel });
};
