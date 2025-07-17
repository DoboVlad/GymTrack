const { mapWorkoutToDatabaseModel, mapWorkoutToViewModel } = require("../mapper/workoutMapper")
const workoutRepository = require("../repositories/workoutRepository");
const exerciseRepository = require("../repositories/exerciseRepository");
const { Op } = require("sequelize");

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

        return await workoutRepository.findByPk(workout.id); // Return the created workout with its exercises
    } catch (error) {
        console.error("Error creating workout:", error);
        throw new Error("Failed to create workout");
    }
}

exports.getWorkoutsByUserId = async (userId, page, limit) => {
    try {
        // Assuming you have a method to fetch workouts by userId
        const workouts = await workoutRepository.findByUserId(userId, page, limit);

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

exports.deleteWorkout = async (workoutId) => {
    try {
        // First, delete all exercises associated with the workout
        await exerciseRepository.deleteExercisesByWorkoutId(workoutId);

        // Then, delete the workout itself
        await workoutRepository.deleteWorkout(workoutId);
    } catch (error) {
        console.error("Error deleting workout:", error);
        throw new Error("Failed to delete workout");
    }
}

exports.filterWorkouts = async (filters) => {
    try {
        const where = {};
        let exerciseWhere = null;

        // Filter by workout name (search term)
        if (filters.searchTerm) {
            exerciseWhere = {
                name: {
                    [Op.like]: `%${filters.searchTerm}%`
                }
            };
        }

        // Filter by selected date (exact day match)
        if (filters.selectedDate) {
            const date = new Date(filters.selectedDate);
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);

            where.date = {
                [Op.gte]: date,
                [Op.lt]: nextDay
            };
        }

        // Filter by day types
        const dayFilters = [];
        if (filters.pushDay === 'true') dayFilters.push('Push Day');
        if (filters.pullDay === 'true') dayFilters.push('Pull Day');
        if (filters.legDay === 'true') dayFilters.push('Legs Day');

        if (dayFilters.length > 0) {
            where.type = {
                [Op.in]: dayFilters
            };
        }

        // Pass Sequelize-style where clause to repo
        return await workoutRepository.findFilteredWorkouts(where, exerciseWhere);
    } catch (error) {
        console.error("Error filtering workouts:", error);
        throw new Error("Failed to filter workouts");
    }
};