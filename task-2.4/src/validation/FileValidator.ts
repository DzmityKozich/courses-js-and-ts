import { ControlValidator } from './ControlValidator';

export class FileValidator extends ControlValidator<HTMLInputElement> {
	public get value(): File[] {
		return [...(this.controlElement.files || [])];
	}
}
