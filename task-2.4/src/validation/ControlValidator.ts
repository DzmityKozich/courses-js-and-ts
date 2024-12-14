import { ValidationErrors, ValidationFn } from './types';

export abstract class ControlValidator<T extends HTMLElement> {
	constructor(protected controlElement: T, protected validators: ValidationFn[]) {}

	public abstract get value(): any;

	public validate(): ValidationErrors | null {
		const errors = this.getErrors();
		this.setValidationCssClass(!errors);
		return errors;
	}

	private getErrors(): ValidationErrors | null {
		const errors = this.validators.reduce((result, validator) => {
			const error = validator(this.value);
			if (!error) return result;
			return { ...result, ...error };
		}, {} as ValidationErrors);
		return Object.keys(errors).length === 0 ? null : errors;
	}

	private setValidationCssClass(valid: boolean): void {
		this.controlElement.classList.remove('valid', 'invalid');
		valid ? this.controlElement.classList.add('valid') : this.controlElement.classList.add('invalid');
	}
}
