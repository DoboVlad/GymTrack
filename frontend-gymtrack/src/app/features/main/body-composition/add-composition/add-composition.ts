import { Component, input, OnChanges, output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BodyCompositionModel } from '../../../../models/body-composition';

@Component({
  selector: 'app-add-composition',
  imports: [ReactiveFormsModule],
  templateUrl: './add-composition.html',
  styleUrl: './add-composition.scss',
})
export class AddComposition implements OnChanges {
  bodyCompositionEdited = input<BodyCompositionModel | null>(null);
  save = output<BodyCompositionModel>();
  cancel = output<void>();

  bodyCompositionForm: FormGroup = new FormGroup({
    date: new FormControl('', { validators: [Validators.required] }),
    weight: new FormControl(0, { validators: [Validators.required, Validators.min(1)] }),
    bodyFat: new FormControl(0, { validators: [Validators.required, Validators.min(1)] }),
    muscleMass: new FormControl(0, { validators: [Validators.required, Validators.min(1)] }),
    bodyWater: new FormControl(0, { validators: [Validators.required, Validators.min(1)] }),
    boneMass: new FormControl(0, { validators: [Validators.required, Validators.min(1)] }),
    metabolicAge: new FormControl(0, { validators: [Validators.required, Validators.min(1)] }),
  });

  formSubmitted = signal(false);
  bodyComp = signal<BodyCompositionModel>({
    id: null,
    date: '',
    weight: 0,
    bodyFat: 0,
    muscleMass: 0,
    bodyWater: 0,
    boneMass: 0,
    metabolicAge: 0,
  });

  private control(controlName: string): FormControl | null {
    return this.bodyCompositionForm.get(controlName) as FormControl;
  }

  ngOnChanges() {
    if (this.bodyCompositionEdited()) {
      this.bodyCompositionForm.patchValue({
        date: this.bodyCompositionEdited()?.date || '',
        weight: this.bodyCompositionEdited()?.weight || 0,
        bodyFat: this.bodyCompositionEdited()?.bodyFat || 0,
        muscleMass: this.bodyCompositionEdited()?.muscleMass || 0,
        bodyWater: this.bodyCompositionEdited()?.bodyWater || 0,
        boneMass: this.bodyCompositionEdited()?.boneMass || 0,
        metabolicAge: this.bodyCompositionEdited()?.metabolicAge || 0,
      });
    }
  }

  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.control(controlName);
    return (control?.touched || this.formSubmitted()) && control?.invalid;
  }

  onSave() {
    if (this.bodyCompositionForm.invalid) {
      this.bodyCompositionForm.markAllAsTouched();
      return;
    }

    let id = this.bodyCompositionEdited()?.id || null;

    this.bodyComp.set({
      id,
      date: this.bodyCompositionForm.value.date,
      weight: this.bodyCompositionForm.value.weight,
      bodyFat: this.bodyCompositionForm.value.bodyFat,
      muscleMass: this.bodyCompositionForm.value.muscleMass,
      bodyWater: this.bodyCompositionForm.value.bodyWater,
      boneMass: this.bodyCompositionForm.value.boneMass,
      metabolicAge: this.bodyCompositionForm.value.metabolicAge,
    });
    this.save.emit({ ...this.bodyComp() });
    this.reset();
  }

  onCancel() {
    this.cancel.emit();
    this.reset();
  }

  reset() {
    this.bodyComp.set({
      id: null,
      date: '',
      weight: 0,
      bodyFat: 0,
      muscleMass: 0,
      bodyWater: 0,
      boneMass: 0,
      metabolicAge: 0,
    });
  }
}
