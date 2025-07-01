export function mapUserToDatabaseModel(oldUserFormat) {
  return {
    first_name: oldUserFormat.firstName,
    last_name: oldUserFormat.lastName,
    email: oldUserFormat.email,
    password: oldUserFormat.password,
    phone: oldUserFormat.phone,
    date_of_birth: oldUserFormat.dob,
    gender: oldUserFormat.gender,
    height_initial: oldUserFormat.height,
    weight_initial: oldUserFormat.kg,
  };
}

export function mapUserToViewModel(oldUserFormat) {
  return {
    firstName: oldUserFormat.first_name,
    lastName: oldUserFormat.last_name,
    email: oldUserFormat.email,
    phone: oldUserFormat.phone,
    dob: oldUserFormat.date_of_birth,
    gender: oldUserFormat.gender,
    height: oldUserFormat.height_initial,
    weight: oldUserFormat.weight_initial,
  };
}