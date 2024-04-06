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
			<input id="navbar-toggle" type="checkbox" />
			<nav class="nav ${this.getBgClass()}">
				<label for="navbar-toggle" class="nav-toggle-btn"></label>

				<div class="logo"></div>

				<div class="navigation">
					<span class="navigation-marker">shop</span>
					<a href="../../pages/home-page/home-page.html">Mainpage</a>
					<a href="../../pages/our-history/our-history.html">Our history</a>
					<a href="../../pages/all-items/all-items.html">All items</a>
					<label for="navbar-toggle" class="x-close-btn text-white">&times;</label>
				</div>

				<div class="basket">
					<button class="btn btn-img basket" @click=${this.openSidebar}></button>
					<button class="btn btn-img fox"></button>
				</div>
			</nav>
		`;
	}
}
