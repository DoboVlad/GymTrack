const Workout = require('../models/Workout');

exports.createWorkout = (workout) => Workout.create(workout);
exports.findByUserId = (userId) => {
    return Workout.findAll({
        where: { userId },
        include: ['exercises'] // Assuming you have an association set up
    });
};