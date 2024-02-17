export abstract class Validator<T extends HTMLElement> {
	constructor(protected controlElement: T, protected isRequired: boolean) {}

	public abstract get valid(): boolean;

	public abstract get value(): any;

	public validate(): boolean {
		const isValid = this.valid;
		this.controlElement.classList.remove('valid', 'invalid');
		isValid ? this.controlElement.classList.add('valid') : this.controlElement.classList.add('invalid');
		return isValid;
	}

	protected hasValue(): boolean {
		if (!this.isRequired) return true;
		return !!this.value;
	}
}

export type StringValidatorParams = {
	pattern?: RegExp;
	minlength?: number;
	maxlength?: number;
};

export class StringValidator extends Validator<HTMLInputElement | HTMLTextAreaElement> {
	constructor(controlElement: HTMLInputElement | HTMLTextAreaElement, isRequired: boolean, private params: StringValidatorParams = {}) {
		super(controlElement, isRequired);
	}

	public get valid(): boolean {
		return this.hasValue() && this.isMatchPattern() && this.isLessThanMaxLength() && this.isGreaterThanMinLength();
	}

	public get value(): string {
		return this.controlElement.value;
	}

	private isMatchPattern(): boolean {
		if (!this.params.pattern) return true;
		return new RegExp(this.params.pattern).test(this.value);
	}

	private isGreaterThanMinLength(): boolean {
		if (!this.params.minlength) return true;
		return this.value.length > this.params.minlength;
	}

	private isLessThanMaxLength(): boolean {
		if (!this.params.maxlength) return true;
		return this.value.length < this.params.maxlength;
	}
}

export class EmailValidator extends StringValidator {
	constructor(controlElement: HTMLInputElement, isRequired: boolean) {
		super(controlElement, isRequired, { pattern: /^[^s@]+@[^s@]+.[^s@]+$/ });
	}
}

export class PasswordValidator extends StringValidator {
	constructor(controlElement: HTMLInputElement) {
		super(controlElement, true, {
			pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
			minlength: 4,
			maxlength: 15,
		});
	}
}

export class ConfirmPasswordValidator extends StringValidator {
	constructor(controlElement: HTMLInputElement, private passwordValidator: PasswordValidator) {
		super(controlElement, true);
	}

	public get valid(): boolean {
		if (!this.passwordValidator.valid) return false;
		return this.passwordValidator.value === this.value;
	}
}

export type NumberValidatorParams = {
	min?: number;
	max?: number;
};

export class NumberValidator extends Validator<HTMLInputElement> {
	constructor(controlElement: HTMLInputElement, isRequired: boolean, private params: NumberValidatorParams = {}) {
		super(controlElement, isRequired);
	}

	public get valid(): boolean {
		return this.hasValue() && !Number.isNaN(this.value) && this.isGreaterThanMin() && this.isLessThanMax();
	}

	public get value(): number {
		return +this.controlElement.value;
	}

	private isLessThanMax(): boolean {
		if (!this.params.max) return true;
		return this.value < this.params.max;
	}

	private isGreaterThanMin(): boolean {
		if (!this.params.min) return true;
		return this.value > this.params.min;
	}
}

export type AploadValidatorParams = {
	fileTypes?: string[];
	filesNumber?: number;
};

export class AploadValidator extends Validator<HTMLInputElement> {
	constructor(controlElement: HTMLInputElement, isRequired: boolean, private params: AploadValidatorParams = {}) {
		super(controlElement, isRequired);
	}

	public get value(): File[] {
		return [...(this.controlElement.files || [])];
	}

	public get valid(): boolean {
		return this.hasValue() && this.checkAmount() && this.checkFileTypes();
	}

	public checkAmount(): boolean {
		if (!this.params.filesNumber) return true;
		return this.value.length <= this.params.filesNumber;
	}

	public checkFileTypes(): boolean {
		if (!this.params.fileTypes) return true;
		return this.value.every((file) => this.params.fileTypes!.includes(file.type));
	}
}
