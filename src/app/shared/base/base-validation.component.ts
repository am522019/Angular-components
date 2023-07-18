import { FormControl, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { ViewChildren, QueryList, Directive } from '@angular/core';

@Directive()
export class BaseValidationComponent {
  formInput: FormGroup;
  @ViewChildren('submitButton') submitButtons: QueryList<any>;

  disableSubmitButton(status: boolean) {
    this.submitButtons.forEach((button) => {
      button.nativeElement.disabled = status;
    });
  }

  isFieldInvalid(field: string, errorType?: string) {
    if (field === 'password' && errorType === 'minlength') {
      return this.formInput.get(field).hasError('minlength') && this.formInput.get(field).touched;
    } else if (field === 'password' && errorType === 'required') {
      return this.formInput.get(field).hasError('required') && this.formInput.get(field).touched;
    } else {
      return this.formInput.get(field).invalid && this.formInput.get(field).touched;
    }
  }

  showFieldStyle(field: string) {
    return {
      'has-error': this.isFieldInvalid(field)
    };
  }

  onSubmit(form: FormGroup) {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.onSubmit(control);
      }
    });
  }
  anyTouched(control: AbstractControl): boolean {
    let isTouched = false;
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach((subField) => {
        const subControl = control.get(subField);
        if (subControl instanceof FormControl) {
          isTouched = isTouched || subControl.touched;
        }
        if (subControl instanceof FormArray) {
          subControl.controls.map((crop: FormGroup) => {
            Object.keys(crop.controls).forEach((subFieldControl) => {
              const cropControl = crop.get(subFieldControl);
              if (cropControl.touched) {
                isTouched = true;
              }
            });
          });
        } else if (subControl instanceof FormGroup) {
          isTouched = this.anyTouched(subControl);
        }
      });
    }
    return isTouched;
  }
  validateForm(form?: FormGroup) {
    if (!form) {
      form = this.formInput;
    }
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }

      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((subField) => {
          const subControl = control.get(subField);
          subControl.markAsTouched({ onlySelf: true });

          if (subControl instanceof FormArray) {
            subControl.controls.map((crop: FormGroup) => {
              Object.keys(crop.controls).forEach((subFieldControl) => {
                const cropControl = crop.get(subFieldControl);
                cropControl.updateValueAndValidity();
                cropControl.markAsTouched({ onlySelf: true });
              });
            });
          }
        });
      }
      if (control instanceof FormArray) {
        control.markAsTouched();
        control.controls.map((crop: FormGroup) => {
          Object.keys(crop.controls).forEach((subFieldControl) => {
            const cropControl = crop.get(subFieldControl);
            cropControl.updateValueAndValidity();
            cropControl.markAsTouched({ onlySelf: true });
          });
        });
      }
    });
  }

  isFieldInvalidNested(parent_field: string, sub_field: string) {
    return this.formInput.get(parent_field).get(sub_field).invalid && this.formInput.get(parent_field).get(sub_field).touched;
  }

  showFieldStyleNested(parent_field: string, sub_field: string) {
    return {
      'has-error': this.isFieldInvalidNested(parent_field, sub_field)
    };
  }
  isRequired(name: string) {
    if (this.formInput) {
      const validator =
        this.formInput.get(name) && this.formInput.get(name).validator && this.formInput.get(name).validator({} as AbstractControl);
      return validator && validator.required ? true : false;
    }
    return;
  }
}
