import '../../../scss/styles.scss';
import './home-page.scss';

const page: HTMLDivElement = document.querySelector('#home-page')!;

export class HomePage {
	constructor(private page: HTMLDivElement) {}
}

new HomePage(page);
