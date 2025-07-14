const Workout = require('../models/Workout');

exports.createWorkout = (workout) => Workout.create(workout);
exports.findByUserId = (user_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  
  return Workout.findAll({
    where: { user_id },
    include: ['exercises'],
    limit,
    offset,
    order: [['created_at', 'DESC']]
  });
};

exports.findByPk = (id) => Workout.findByPk(id, {
  include: ['exercises']
});

exports.deleteWorkout = (id) => Workout.destroy({
    where: { id }
});