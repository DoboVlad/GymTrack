const { mapWorkoutToDatabaseModel, mapWorkoutToViewModel } = require("../mapper/workoutMapper")
const workoutRepository = require("../repositories/workoutRepository");
const exerciseRepository = require("../repositories/exerciseRepository");

exports.createWorkout = async (payload) => {
    // map to database model
    const workoutData = mapWorkoutToDatabaseModel(payload);

    // redirect to workout repository
    try {
        const workout = await workoutRepository.createWorkout(workoutData);
        console.log("Creating exercises:", payload.exercises);

        if (payload.exercises && Array.isArray(payload.exercises)) {
            // Create exercises and associate them with the workout
            const exercises = payload.exercises.map(exercise => ({
                ...exercise,
                workout_id: workout.id // Assuming the workout model has an id field
            }));
            await Promise.all(exercises.map(exercise => exerciseRepository.createExercise(exercise)));
        }

        return workout;
    } catch (error) {
        console.error("Error creating workout:", error);
        throw new Error("Failed to create workout");
    }
}

exports.getWorkoutsByUserId = async (userId) => {
    try {
        // Assuming you have a method to fetch workouts by userId
        const workouts = await workoutRepository.findByUserId(userId);

        let mappedWorkouts = [];
        if (Array.isArray(workouts)) {
            mappedWorkouts = workouts.map(workout => mapWorkoutToViewModel(workout));
        } else {
            mappedWorkouts = mapWorkoutToViewModel(workouts);
        }

        return mappedWorkouts;
    } catch (error) {
        console.error("Error fetching workouts:", error);
        throw new Error("Failed to fetch workouts");
    }
}