import { Exercise } from "./exercise";

export interface Workout {
    type: 'Push day' | 'Pull day' | 'Legs day' | '';
    date: string;
    exercises: Exercise[];
}