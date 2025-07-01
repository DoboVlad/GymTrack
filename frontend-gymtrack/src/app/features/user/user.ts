import { Component, signal } from '@angular/core';
import { UserModel } from '../../models/user';
import { UserService } from '../services/user/user';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class User {
  user = signal<UserModel | null>(null);

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserById();
  }
  
  private getUserById() {
    this.userService.getLoggedInUser().subscribe({
      next: (user) => {
        console.log("User fetched successfully:", user);
        this.user.set(user.user);
      },
      error: (err) => {
        console.error("Error fetching user:", err);
      }
    });  
  }
}
