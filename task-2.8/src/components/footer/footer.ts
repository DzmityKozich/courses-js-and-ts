import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('fox-footer')
export class Footer extends LitElement {
	constructor() {
		super();
	}

	protected render() {
		return html`
			<footer>
				<h1>FOOTER</h1>
			</footer>
		`;
	}
}
