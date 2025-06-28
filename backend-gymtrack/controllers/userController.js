const userService = require("../services/userService");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.authenticateUser(email, password);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({
    token,
    user: { id: user.id, email: user.email, first_name: user.first_name },
  });
};
