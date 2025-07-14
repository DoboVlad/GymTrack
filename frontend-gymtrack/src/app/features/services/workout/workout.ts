import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from '../../../models/workout';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private httpClient: HttpClient) { }

  createWorkout(workout: Workout) {
    return this.httpClient.post<Workout>(`${environment.apiUrl}/api/workout`, workout);
  }

  getWorkouts(page: number, limit: number = 300) {
    return this.httpClient.get<Workout[]>(`${environment.apiUrl}/api/workout?page=${page}&limit=${limit}`);
  }

  deleteWorkout(workoutId: string) {
    return this.httpClient.delete(`${environment.apiUrl}/api/workout/${workoutId}`);
  }
}
