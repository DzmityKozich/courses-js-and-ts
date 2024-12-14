import { ControlValidator } from './ControlValidator';

export class NumberValidator extends ControlValidator<HTMLInputElement> {
	public get value(): number {
		const value = this.controlElement.value;
		if (!value) return NaN;
		return +value;
	}
}
