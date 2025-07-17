import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from '../../../models/workout';
import { environment } from '../../../../environments/environment.development';
import { WorkoutFilters } from '../../main/workouts/workout-search/workout-search';

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

  getFilteredWorkouts(filters: WorkoutFilters) {
    const params = new URLSearchParams();
    if (filters.searchTerm) {
      params.append('searchTerm', filters.searchTerm);
    }
    if (filters.selectedDate) {
      params.append('selectedDate', filters.selectedDate.toISOString());
    }
    if (filters.dayFilters.pushDay) {
      params.append('pushDay', 'true');
    }
    if (filters.dayFilters.pullDay) {
      params.append('pullDay', 'true');
    }
    if (filters.dayFilters.legDay) {
      params.append('legDay', 'true');
    }

    return this.httpClient.get<Workout[]>(`${environment.apiUrl}/api/workout/filter?${params.toString()}`);
  }
}
