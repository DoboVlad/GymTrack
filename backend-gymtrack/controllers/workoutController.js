const workoutService = require("../services/workoutService");

exports.createWorkout = async (req, res) => {
    const userId = req.user.userId; // Assuming req.user is set by auth middleware
    if (!userId) {
        return res.status(400).json({ message: "No user ID provided" });
    }

    // Validate request body
    if (!req.body.date || !Array.isArray(req.body.exercises) || req.body.exercises.length === 0) {
        return res.status(400).json({ message: "Invalid request body" });
    }

    const payload = req.body;
    payload.userId = userId; // Add userId to the payload
    // redirect to workout service
    const workout = workoutService.createWorkout(payload);

    return res.status(201).json({
        message: "Workout created successfully",
        workout: workout
    });
};

exports.getWorkouts = async (req, res) => {
    const userId = req.user.userId; // Assuming req.user is set by auth middleware
    if (!userId) {
        return res.status(400).json({ message: "No user ID provided" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    try {
        const workouts = await workoutService.getWorkoutsByUserId(userId, page, limit);
        res.json(workouts);
    } catch (error) {
        console.error("Error fetching workouts:", error);
        res.status(500).json({ message: "Failed to fetch workouts" });
    }
}

exports.deleteWorkout = async (req, res) => {
    const userId = req.user.userId; // Assuming req.user is set by auth middleware
    if (!userId) {
        return res.status(400).json({ message: "No user ID provided" });
    }

    const workoutId = req.params.id;
    if (!workoutId) {
        return res.status(400).json({ message: "No workout ID provided" });
    }

    try {
        await workoutService.deleteWorkout(workoutId);
        res.status(200).json({ message: "Workout deleted successfully" });
    } catch (error) {
        console.error("Error deleting workout:", error);
        res.status(500).json({ message: "Failed to delete workout" });
    }
}