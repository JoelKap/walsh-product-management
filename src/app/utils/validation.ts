import { FormControl, FormGroup } from '@angular/forms';
import { forEach } from 'lodash';

export function touchAllFormFields(formGroup: FormGroup): void {
    forEach(formGroup.controls, control => {
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            touchAllFormFields(control);
        }
    });
}
