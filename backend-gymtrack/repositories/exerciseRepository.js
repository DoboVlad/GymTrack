const Exercise = require('../models/Exercise');

exports.createExercise = (exercise) => Exercise.create(exercise); 
exports.deleteExercisesByWorkoutId = (workoutId) => {
    return Exercise.destroy({
        where: { workout_id: workoutId }
    });
}