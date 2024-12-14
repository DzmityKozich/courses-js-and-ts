import { ControlValidator } from './ControlValidator';
import { ValidationFn } from './types';

export const required: ValidationFn = (value: any) => {
	const valid = ![undefined, null, '', NaN].includes(value);
	if (valid) return null;
	return { required: 'Value is Required!' };
};

export const pattern = (pattern: RegExp): ValidationFn<string> => {
	return (value) => {
		const valid = pattern.test(value);
		if (valid) return null;
		return { pattern: 'Value have to match the pattern!' };
	};
};

export const email: ValidationFn<string> = (value) => {
	const valid = /^[^s@]+@[^s@]+.[^s@]+$/.test(value);
	if (valid) return null;
	return { email: 'Invalid email' };
};

export const maxlength = (length: number): ValidationFn<string> => {
	return (value) => {
		if (value === '') return null;
		const valid = value.length <= length;
		if (valid) return null;
		return { maxlength: `Length have to be less than ${length}` };
	};
};

export const minlength = (length: number): ValidationFn<string> => {
	return (value) => {
		if (value === '') return null;
		const valid = value.length >= length;
		if (valid) return null;
		return { minlength: `Length have to be greater than ${length}` };
	};
};

export const min = (amount: number): ValidationFn<number> => {
	return (value) => {
		if (isNaN(value)) return null;
		const valid = value >= amount;
		if (valid) return null;
		return { min: `Value have to be greater than ${amount}` };
	};
};

export const max = (amount: number): ValidationFn<number> => {
	return (value) => {
		if (isNaN(value)) return null;
		const valid = value <= amount;
		if (valid) return null;
		return { max: `Value have to be less than ${amount}` };
	};
};

export const fileTypes = (types: string[]): ValidationFn<File[]> => {
	return (value) => {
		const valid = value.every((file) => types.includes(file.type));
		if (valid) return null;
		return { fileTypes: 'Contains unsupported files' };
	};
};

export const confirmPassword = (passwordValidator: ControlValidator<HTMLElement>): ValidationFn<string> => {
	return (value) => {
		const valid = value === passwordValidator.value;
		if (valid) return null;
		return { confirmPassword: `Password mismatch` };
	};
};
