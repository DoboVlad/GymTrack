import { Exercise } from "./Exercise";

export interface Workout {
    id: string;
    date: string;
    dayType: 'Push Day' | 'Pull Day' | 'Leg Day';
    exercise: Exercise[];
}