import { Exercise } from "./exercise";

export interface Workout {
    id: string | null;
    type: 'Push day' | 'Pull day' | 'Legs day' | '';
    date: string;
    exercises: Exercise[];
}