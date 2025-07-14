const Workout = require('../models/Workout');

exports.createWorkout = (workout) => Workout.create(workout);
exports.findByUserId = (user_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  
  console.log(`Fetching workouts for user_id: ${user_id}, page: ${page}, limit: ${limit}, offset: ${offset}`);
  return Workout.findAll({
    where: { user_id },
    include: ['exercises'],
    limit,
    offset,
    order: [['created_at', 'DESC']]
  });
};

exports.findByPk = (id) => Workout.findByPk({
    where: { id },
    include: ['exercises'] // Assuming you have an association set up
});

exports.deleteWorkout = (id) => Workout.destroy({
    where: { id }
});