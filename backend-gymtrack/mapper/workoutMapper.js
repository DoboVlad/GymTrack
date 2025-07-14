export function mapWorkoutToDatabaseModel(workout) {
    return {
        user_id: workout.userId,
        created_at: workout.date,
        type: workout.type, // Assuming 'type' is a field in the database
        exercises: workout.exercises.map(exercise => ({
            created_at: workout.date,
            name: exercise.name,
            weight: exercise.weight // Assuming weight is in kg or 'bodyweight'
        }))
    };
}

export function mapWorkoutToViewModel(workout) {
    return {
        userId: workout.user_id,
        date: workout.created_at,
        id: workout.id,
        type: workout.type,
        exercises: workout.exercises.map(exercise => ({
            name: exercise.name,
            weight: exercise.weight // Assuming weight is in kg or 'bodyweight'
        }))
    };
}