import { ControlValidator } from './ControlValidator';

export interface ValidationErrors {
	[errorKey: string]: string;
}

export type ValidationFn<T = any> = (value: T) => ValidationErrors | null;

export interface ValidationForm {
	[param: string]: ControlValidator<HTMLElement>;
}

export interface ValidationFormErrors {
	[key: string]: ValidationErrors;
}
