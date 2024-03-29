import { TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LitComponent } from '../../LitComponent';
import { sidebarToggle } from '../sidebar/sidebar-toggle';

import './navbar.scss';
import { classMap } from 'lit/directives/class-map.js';

type BgColor = 'white' | 'transparent' | 'black';

@customElement('fox-navbar')
export class Navbar extends LitComponent {
	@property({ type: String })
	public background!: BgColor;

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

	private logoImg(): TemplateResult {
		const logo = this.background === 'white' ? 'logo-color' : 'logo';
		return html`<img src="../../../icons/navbar/${logo}.svg" alt="logo" />`;
	}

	private foxImg(): TemplateResult {
		const fox = this.background === 'white' ? 'fox-black' : 'fox';
		return html`<img src="../../../icons/navbar/${fox}.svg" alt="fox" />`;
	}

	private basketImg(): TemplateResult {
		const basket = this.background === 'white' ? 'basket-black' : 'basket';
		return html`<img src="../../../icons/navbar/${basket}.svg" alt="basket" />`;
	}

	private openSidebar = () => {
		sidebarToggle.toggle('open');
	};

	protected render(): TemplateResult {
		const colorClass = { 'text-black': this.background === 'white' };
		return html`
			<nav class="nav ${this.getBgClass()}">
				<div class="logo">${this.logoImg()}</div>

				<div class="navigation ${classMap(colorClass)}">
					<span class="navigation-marker">shop</span>
					<a href="../../pages/home-page/home-page.html">Mainpage</a>
					<a href="../../pages/our-history/our-history.html">Our history</a>
					<a href="../../pages/all-items/all-items.html">All items</a>
				</div>

				<div class="basket">
					<button class="btn btn-img" @click=${this.openSidebar}>${this.basketImg()}</button>
					<button class="btn btn-img">${this.foxImg()}</button>
				</div>
			</nav>
		`;
	}
}
