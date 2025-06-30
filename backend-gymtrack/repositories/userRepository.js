const User = require('../models/User');

exports.findByEmail = (email) => User.findOne({ where: { email } });
exports.createUser = (userData) => User.create(userData);