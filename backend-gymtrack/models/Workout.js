const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Import the User model to set up the relationship

const Workout = sequelize.define('Workout', {
  // Primary key id is automatically added by Sequelize unless you disable it
  type: { type: DataTypes.STRING, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'workout',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Set up the relationship: Each Workout belongs to a User
Workout.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Workout, { foreignKey: 'user_id', as: 'workouts' });

module.exports = Workout;
