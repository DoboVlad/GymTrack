import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  formSubmitted = signal(false);
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),

    phone: new FormControl(''), // Optional, so no validators
    dob: new FormControl('', [Validators.required]),
    kg: new FormControl('', [Validators.required, Validators.min(1)]),
    height: new FormControl('', [Validators.required, Validators.min(1)]),
    gender: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) {}

  // Generic control accessor
  control(controlName: string): AbstractControl | null {
    return this.registerForm.get(controlName);
  }

  // Checks if a control is invalid and should show errors (touched or submitted)
  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.control(controlName);
    return (control?.touched || this.formSubmitted()) && control?.invalid;
  }

  // Checks if a control has a specific error
  hasError(controlName: string, errorCode: string): boolean {
    return !!this.control(controlName)?.errors?.[errorCode];
  }

  onSubmitRegisterForm() {
    this.formSubmitted.set(true);
    if(this.registerForm.invalid) {
      return;
    }

    this.router.navigate(['/main']);
  }
}
