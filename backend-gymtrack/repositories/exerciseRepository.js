const Exercise = require('../models/Exercise');

exports.createExercise = (exercise) => Exercise.create(exercise); 