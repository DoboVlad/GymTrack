const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // To set up the relation

const BodyComposition = sequelize.define('BodyComposition', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  weight: { type: DataTypes.FLOAT, allowNull: false },
  body_fat: { type: DataTypes.FLOAT, allowNull: true },
  muscle_mass: { type: DataTypes.FLOAT, allowNull: true },
  body_water: { type: DataTypes.FLOAT, allowNull: true },
  bone_mass: { type: DataTypes.FLOAT, allowNull: true },
  metabolic_age: { type: DataTypes.INTEGER, allowNull: true },
  picture_url: { type: DataTypes.STRING, allowNull: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'body_composition',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Each BodyComposition belongs to a User
BodyComposition.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Each User has many BodyCompositions
User.hasMany(BodyComposition, { foreignKey: 'user_id', as: 'bodyCompositions' });

module.exports = BodyComposition;
