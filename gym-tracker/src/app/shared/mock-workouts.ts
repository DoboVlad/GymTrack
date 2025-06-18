// src/app/shared/mock-workouts.ts
import { Workout } from '../models/Workout';

export const MOCK_WORKOUTS: Workout[] = [
  {
    id: '1',
    date: '2025-04-16',
    dayType: 'Push Day',
    exercise: [
      { name: 'Bench Press', weightKg: 85 },
      { name: 'Overhead Press', weightKg: 45 },
      { name: 'Tricep Dips', weightKg: 20 },
    ],
  },
  {
    id: '2',
    date: '2025-04-18',
    dayType: 'Pull Day',
    exercise: [
      { name: 'Deadlift', weightKg: 140 },
      { name: 'Pull-Ups', weightKg: 0 },
      { name: 'Barbell Row', weightKg: 70 },
    ],
  },
  {
    id: '3',
    date: '2025-04-20',
    dayType: 'Leg Day',
    exercise: [
      { name: 'Squat', weightKg: 100 },
      { name: 'Leg Press', weightKg: 200 },
      { name: 'Calf Raise', weightKg: 60 },
    ],
  },
  {
    id: '4',
    date: '2025-04-22',
    dayType: 'Push Day',
    exercise: [
      { name: 'Incline Bench', weightKg: 75 },
      { name: 'Chest Fly', weightKg: 30 },
      { name: 'Shoulder Press', weightKg: 50 },
    ],
  },
];
