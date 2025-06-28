import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChartPieIcon, DumbbellIcon, HouseIcon, LucideAngularModule, TrendingUpIcon, UserIcon } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  links = signal([
    { name: 'Home', icon: HouseIcon, route: '/welcome' },
    { name: 'User Profile', icon: UserIcon, route: '/user-profile' },
    { name: 'Workouts', icon: DumbbellIcon, route: '/workouts' },
    {
      name: 'Body Composition',
      icon: ChartPieIcon,
      route: '/body-composition',
    },
    { name: 'Progress', icon: TrendingUpIcon, route: '/progress' },
  ]);
}
