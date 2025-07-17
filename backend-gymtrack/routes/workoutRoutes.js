const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, workoutController.createWorkout);
router.get('/', auth, workoutController.getWorkouts);
router.delete('/:id', auth, workoutController.deleteWorkout);
router.get('/filter', auth, workoutController.filterWorkouts);

module.exports = router;
