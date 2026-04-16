import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { noSpaces, minUppercase, passwordsMatch } from './validators/validators';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder,
    private nonfb: NonNullableFormBuilder
  ) {
    this.registrationForm = this.fb.group({
      username: this.nonfb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
          noSpaces
        ]
      }),
      email: this.nonfb.control('', {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: this.nonfb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          minUppercase(1)
        ]
      }),
      confirmPassword: this.nonfb.control('', {
        validators: [
          Validators.required
        ]
      }),
      phoneNumbers: this.fb.array([]),
      age: this.nonfb.control(0, { validators: [Validators.min(18), Validators.max(120)] }),
      
      address: this.fb.group({
        street: this.nonfb.control(''),
        city: this.nonfb.control(''),
        state: this.nonfb.control(''),
        zipCode: this.nonfb.control('', { validators: [Validators.pattern(/^[0-9]+$/)] })
      })
    }, 
    {
      validators: [
        passwordsMatch
      ]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    console.log(this.registrationForm.value);
    console.log(this.registrationForm.getRawValue());
    console.log(this.registrationForm.get('username'));
  }

  get username(): FormControl {
    return this.registrationForm.get('username') as FormControl;
  }

  get email(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get phoneNumbers(): FormArray {
    return this.registrationForm.get('phoneNumbers') as FormArray;
  }

  get age(): FormControl {
    return this.registrationForm.get('age') as FormControl;
  }

  get address(): FormGroup
  {
    return this.registrationForm.get('address') as FormGroup;
  }

  get street(): FormControl
  {
    return this.address.get('street') as FormControl;
  }

  get city(): FormControl
  {
    return this.address.get('city') as FormControl;
  }

  get state(): FormControl
  {
    return this.address.get('state') as FormControl;
  }

  get zipCode(): FormControl
  {
    return this.address.get('zipCode') as FormControl;
  }

  addPhoneNumber(): void {
    this.phoneNumbers.push(this.nonfb.control('', {
      validators: [Validators.required]
    }))
  }

  removePhoneNumber(index: number): void {
    this.phoneNumbers.removeAt(index);
  }

  fillSampleData(): void 
  {
    //First added 2 phone number controls
    this.addPhoneNumber();
    this.addPhoneNumber();
    this.registrationForm.setValue({
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      password: 'Password123',
      confirmPassword: 'Password123',
      age: 25,
      address: {
        street : '123 Main St',
        city: 'New York',
        state: 'New York',
        zipCode: '12345'
      },
      phoneNumbers: [
        '1234567890',
        '9876543210'
      ]
    })
  }

  fillAddressOnly(): void
  {
    this.registrationForm.patchValue({
      address: {
        street : '456 Oak St',
        city: 'New York',
        state: 'New York',
        zipCode: '12345'
      }
    })
  }
}
