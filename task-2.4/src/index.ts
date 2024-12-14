import { StringValidator } from './validation/StringValidator';
import { FormValidator } from './validation/FormValidator';
import { FileValidator } from './validation/FileValidator';
import { NumberValidator } from './validation/NumberValidator';
import { confirmPassword, email, fileTypes, maxlength, min, minlength, pattern, required } from './validation/validators';

import '../scss/styles.scss';

const firstNameInput = document.querySelector<HTMLInputElement>('#first-name')!;
const lastNameInput = document.querySelector<HTMLInputElement>('#last-name')!;
const emailInput = document.querySelector<HTMLInputElement>('#email')!;
const passwordInput = document.querySelector<HTMLInputElement>('#password')!;
const passwordConfirmInput = document.querySelector<HTMLInputElement>('#confirm-password')!;
const fileUploadInput = document.querySelector<HTMLInputElement>('#file-upload')!;
const ageInput = document.querySelector<HTMLInputElement>('#age')!;
const bioInput = document.querySelector<HTMLInputElement>('#bio')!;
const createBtn = document.querySelector<HTMLButtonElement>('button.btn-submit')!;

const passwordValidator = new StringValidator(passwordInput, [required, pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]);
const formValidator = new FormValidator({
	'first-name': new StringValidator(firstNameInput, [required, pattern(/^[a-zA-Z- ]+$/i), maxlength(45), minlength(3)]),
	'last-name': new StringValidator(lastNameInput, [required, pattern(/^[a-zA-Z- ]+$/i), maxlength(45), minlength(3)]),
	email: new StringValidator(emailInput, [required, email]),
	password: passwordValidator,
	'confirm-password': new StringValidator(passwordConfirmInput, [required, confirmPassword(passwordValidator)]),
	'file-upload': new FileValidator(fileUploadInput, [fileTypes(['image/png', 'image/jpg', 'image/jpeg'])]),
	age: new NumberValidator(ageInput, [min(18)]),
	bio: new StringValidator(bioInput, [minlength(20), maxlength(400)]),
});

createBtn.addEventListener('click', () => {
	const result = formValidator.validate();
	Object.entries(result).forEach(([key, errors]) => {
		const validationError = document.querySelector(`#${key}`)!.parentElement!.querySelector('.validation-error')!;
		validationError.innerHTML = Object.values(errors)
			.map((err) => `<div>${err}</div>`)
			.join('\n');
	});
});
