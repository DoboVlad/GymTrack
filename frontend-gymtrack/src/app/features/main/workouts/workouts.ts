import { Component, HostListener, OnInit, signal } from '@angular/core';
import { Workout } from '../../../models/workout';
import { WorkoutCard } from './workout-card/workout-card';
import { AddWorkout } from "./add-workout/add-workout";
import { WorkoutService } from '../../services/workout/workout';
import { debounceTime, Subject } from 'rxjs';
import { WorkoutFilters, WorkoutSearch } from "./workout-search/workout-search";

@Component({
  selector: 'app-workouts',
  imports: [WorkoutCard, AddWorkout, WorkoutSearch],
  templateUrl: './workouts.html',
  styleUrl: './workouts.scss',
})
export class Workouts implements OnInit {
  isAddModalShown = signal<boolean>(false);
  workouts = signal<Workout[]>([]);
  currentPage = signal(1);
  isLoading = signal(false);
  isEndOfData = signal(false);

  private scroll$ = new Subject<void>();

  @HostListener('window:scroll', [])
  onScroll(): void {
    const threshold = 300; // px from bottom before triggering
    const position = window.innerHeight + window.scrollY;
    const height = document.body.scrollHeight;

    if (position > height - threshold) {
      this.scroll$.next(); // only when near bottom
    }
  }

  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.scroll$.pipe(debounceTime(1000)).subscribe(() => this.getWorkouts());
    this.getWorkouts();
  }

  onClickDisplayAddModal() {
    this.isAddModalShown.set(true);
  }

  onFilterWorkouts(filters: WorkoutFilters) {
    if (this.isEmptyFilter(filters)) {
      this.getWorkouts();
    } else {
      this.getFilteredWorkouts(filters);
    }
  }

  private isEmptyFilter(filters: any): boolean {
    const { searchTerm, selectedDate, dayFilters } = filters;

    const noSearchTerm = !searchTerm || searchTerm.trim() === '';
    const noDate = !selectedDate;
    const noDayFilter =
      !dayFilters.pushDay &&
      !dayFilters.pullDay &&
      !dayFilters.legDay;

    return noSearchTerm && noDate && noDayFilter;
  }

  private getFilteredWorkouts(filters: WorkoutFilters) {
    this.workoutService.getFilteredWorkouts(filters).subscribe({
      next: (filteredWorkouts) => {
        this.workouts.set(filteredWorkouts);
        this.currentPage.set(1); // Reset to first page on new filter
        this.isEndOfData.set(filteredWorkouts.length === 0);
      },
      error: (error) => {
        console.error('Error fetching filtered workouts:', error);
      },
    });
  }

  private getWorkouts() {
    this.workoutService.getWorkouts(this.currentPage()).subscribe({
      next: (newWorkouts) => {
        if (newWorkouts.length === 0) {
          this.isEndOfData.set(true);
        } else {
          this.workouts.update(current => [...current, ...newWorkouts]);
          this.currentPage.update(page => page + 1);
        }
      },
      error: (error) => {
        console.error('Error fetching workouts:', error);
      },
    });
  }

  onModalSave(workout: Workout) {
    this.workoutService.createWorkout(workout).subscribe({
      next: (response: any) => {
        const newWorkout: Workout = response.workout;
        this.workouts.update(old => [newWorkout, ...old]);
      },
      error: (error) => {
        console.error('Error creating workout:', error);
      },
    });

    this.isAddModalShown.set(false);
  }

  onDeleteWorkout(workoutId: string) {
    this.workoutService.deleteWorkout(workoutId).subscribe({
      next: () => {
        this.workouts.update(old => old.filter(workout => workout.id !== workoutId));
        console.log('Workout deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting workout:', error);
      },
    });

  }

  onModalCancel() {
    this.isAddModalShown.set(false);
  }
}
