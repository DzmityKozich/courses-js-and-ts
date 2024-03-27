import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LitComponent } from '../../LitComponent';
import '../../share/icon';

import './navbar.scss';

@customElement('fox-navbar')
export class Navbar extends LitComponent {
	@property({ type: String })
	public background!: 'white' | 'transparent' | 'black';

	constructor() {
		super();
	}

	private getBgClass(): string {
		switch (this.background) {
			case 'black':
				return 'bg-black';
			case 'transparent':
				return 'bg-transparent';
			case 'white':
				return 'bg-white';
		}
	}

	// TODO: change img depends on bg-color
	protected render() {
		return html`
			<nav class="nav ${this.getBgClass()}">
				<div class="logo">
					<img src="../../../icons/navbar/logo.svg" alt="logo" />
				</div>

				<div class="navigation">
					<span class="navigation-marker">shop</span>
					<a href="">Mainpage</a>
					<a href="">Our history</a>
					<a href="">All items</a>
				</div>

				<div class="basket">
					<img src="../../../icons/navbar/basket.svg" alt="basket" />
					<img src="../../../icons/navbar/fox.svg" alt="fox" />
				</div>
			</nav>
		`;
	}
}
