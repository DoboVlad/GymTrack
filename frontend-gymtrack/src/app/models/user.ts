export interface UserModel {
    id?: string; 
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string; 
    createdAt?: Date; 
    updatedAt?: Date; 
    phone: string; 
    dob?: string; 
    gender: string; 
}