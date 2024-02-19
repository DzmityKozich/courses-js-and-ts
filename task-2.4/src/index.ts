import {
	AploadValidator,
	ConfirmPasswordValidator,
	EmailValidator,
	NumberValidator,
	PasswordValidator,
	StringValidator,
	StringValidatorParams,
	Validator,
} from './Validator';

import '../scss/styles.scss';

const firstNameInput = document.querySelector<HTMLInputElement>('#first-name')!;
const lastNameInput = document.querySelector<HTMLInputElement>('#last-name')!;
const emailInput = document.querySelector<HTMLInputElement>('#email')!;
const passwordInput = document.querySelector<HTMLInputElement>('#password')!;
const passwordConfirmNameInput = document.querySelector<HTMLInputElement>('#confirm-password')!;
const fileUploadInput = document.querySelector<HTMLInputElement>('#file-upload')!;
const ageInput = document.querySelector<HTMLInputElement>('#age')!;
const createBtn = document.querySelector<HTMLButtonElement>('button.btn-submit')!;

const nameInputParams: StringValidatorParams = { pattern: /^[a-zA-Z- ]+$/i, maxlength: 45, minlength: 3 };
const firstNameValidator: StringValidator = new StringValidator(firstNameInput, true, nameInputParams);
const lastNameValidator: StringValidator = new StringValidator(lastNameInput, true, nameInputParams);
const emailValidator: EmailValidator = new EmailValidator(emailInput, true);
const passwordValidator: PasswordValidator = new PasswordValidator(passwordInput);
const confirmPasswordValidator: ConfirmPasswordValidator = new ConfirmPasswordValidator(passwordConfirmNameInput, passwordValidator);
const fileUploadValidator: AploadValidator = new AploadValidator(fileUploadInput, false, { fileTypes: ['image/png', 'image/jpg'] });
const ageValidator: NumberValidator = new NumberValidator(ageInput, false, { min: 18 });

const validators: Validator<HTMLElement>[] = [
	firstNameValidator,
	lastNameValidator,
	emailValidator,
	passwordValidator,
	confirmPasswordValidator,
	fileUploadValidator,
	ageValidator,
];

createBtn.addEventListener('click', () => {
	validators.forEach((validator) => {
		validator.validate();
	});
});
