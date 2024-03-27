import { TemplateResult, html } from 'lit';
import { LitComponent } from '../../LitComponent';
import { customElement } from 'lit/decorators.js';

import './sidebar.scss';

@customElement('fox-sidebar')
export class Sidebar extends LitComponent {
	private onBackdropClick = (event: any) => {
		console.log(event);
	};

	connectedCallback(): void {
		// TODO: listen for toggle here
	}

	protected render(): TemplateResult {
		return html` <div class="sidebar">
			<div class="backdrop" @click=${this.onBackdropClick}></div>
			<div class="sidebar-content">CONTENT</div>
		</div>`;
	}
}
