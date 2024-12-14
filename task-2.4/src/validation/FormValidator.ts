import { ControlValidator } from './ControlValidator';
import { ValidationForm, ValidationFormErrors } from './types';

export class FormValidator {
	constructor(private form: ValidationForm) {}

	public validate(): ValidationFormErrors {
		return Object.entries(this.form).reduce((errors, [key, validator]) => {
			const err = validator.validate();
			if (!err) return errors;
			return { ...errors, [key]: err };
		}, {} as ValidationFormErrors);
	}

	public get(controlName: string): ControlValidator<HTMLElement> | null {
		return this.form[controlName] || null;
	}
}
