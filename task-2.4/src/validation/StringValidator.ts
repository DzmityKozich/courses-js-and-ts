import { ControlValidator } from './ControlValidator';

export class StringValidator extends ControlValidator<HTMLInputElement | HTMLTextAreaElement> {
	public get value(): string {
		return this.controlElement.value;
	}
}
