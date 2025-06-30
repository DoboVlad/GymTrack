export function mapUserPayload(oldUserFormat) {
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