const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");

exports.registerUser = async (userData) => {
  console.log("Registering user:", userData);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  return userRepository.createUser({ ...userData, password: hashedPassword });
};

exports.authenticateUser = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  return valid ? user : null;
};
