import { AbstractControl, ValidationErrors, FormArray } from '@angular/forms';

export class AtLeastOneExerciseValidator {
  static atLeastOne(control: AbstractControl): ValidationErrors | null {
    const formArray = control as FormArray;
    return formArray && formArray.length > 0 ? null : { atLeastOne: true };
  }
}