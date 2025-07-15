export function mapBodyCompToDatabaseModel(oldBodyCompFormat) {
  return {
    id: oldBodyCompFormat.id,
    user_id: oldBodyCompFormat.userId,
    weight: oldBodyCompFormat.weight,
    body_fat: oldBodyCompFormat.bodyFat,
    metabolic_age: oldBodyCompFormat.metabolicAge, 
    bone_mass: oldBodyCompFormat.boneMass, 
    body_water: oldBodyCompFormat.bodyWater, 
    muscle_mass: oldBodyCompFormat.muscleMass,
    date: oldBodyCompFormat.date,
  };
}

export function mapBodyCompToViewModel(oldBodyCompFormat) {
  return {
    id: oldBodyCompFormat.id,
    userId: oldBodyCompFormat.user_id,
    weight: oldBodyCompFormat.weight,
    boneMass: oldBodyCompFormat.bone_mass,
    metabolicAge: oldBodyCompFormat.metabolic_age,
    bodyWater: oldBodyCompFormat.body_water,
    bodyFat: oldBodyCompFormat.body_fat,
    muscleMass: oldBodyCompFormat.muscle_mass,
    date: oldBodyCompFormat.date,
  };
}