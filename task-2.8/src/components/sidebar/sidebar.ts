import { TemplateResult, html } from 'lit';
import { LitComponent } from '../../LitComponent';
import { customElement, state } from 'lit/decorators.js';
import { sidebarToggle } from './sidebar-toggle';
import { classMap } from 'lit/directives/class-map.js';

import './sidebar.scss';

@customElement('fox-sidebar')
export class Sidebar extends LitComponent {
	@state()
	private isOpen: boolean = false;

	private onBackdropClick = () => {
		this.isOpen = false;
	};

	connectedCallback(): void {
		super.connectedCallback();
		sidebarToggle.onToggle((state) => {
			this.isOpen = state === 'open';
		});
	}

	protected render(): TemplateResult {
		const classes = { open: this.isOpen };
		return html` <div class="sidebar ${classMap(classes)}">
			<div class="backdrop" @click=${this.onBackdropClick}></div>
			<div class="sidebar-content">CONTENT</div>
		</div>`;
	}
}
