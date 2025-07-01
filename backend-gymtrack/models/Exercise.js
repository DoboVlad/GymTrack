const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Workout = require('./Workout'); // To set up the relation

const Exercise = sequelize.define('Exercise', {
  name: { type: DataTypes.STRING, allowNull: false },
  weight: { type: DataTypes.DECIMAL(5,2), allowNull: true },
  // Optionally, add reps, sets, notes, etc.
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'exercise',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// Each Exercise belongs to a Workout
Exercise.belongsTo(Workout, { foreignKey: 'workout_id', as: 'workout' });

// Each Workout has many Exercises
Workout.hasMany(Exercise, { foreignKey: 'workout_id', as: 'exercises' });

module.exports = Exercise;
