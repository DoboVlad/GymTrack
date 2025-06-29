import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(7)],
    }),
  });
  formSubmitted = signal(false);

  constructor(private router: Router) {}

  get emailIsInvalid() {
    const email = this.loginForm.controls.email;
    return (email.touched || this.formSubmitted()) && email.invalid;
  }

  get passwordIsInvalid() {
    const password = this.loginForm.controls.password;
    return (password.touched || this.formSubmitted()) && password.invalid;
  }

  onSubmitLoginForm() {
    this.formSubmitted.set(true);
    if (this.loginForm.invalid) {
      return;
    }
    this.router.navigate(['/main']);
    this.formSubmitted.set(false);
  }
}
