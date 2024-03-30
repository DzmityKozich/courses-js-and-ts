import { customElement, property } from 'lit/decorators.js';
import { LitComponent } from '../../LitComponent';
import { Fox } from '../../models/Fox';
import { TemplateResult, html } from 'lit';
import '../../share/rating/rating';

import './fox-item-card.scss';

const converter = (incomeValue: string | null) => {
	if (!incomeValue) return null;
	return new Fox(incomeValue.replace(/'/g, '"'));
};

@customElement('fox-item-card')
export class ItemCard extends LitComponent {
	@property({
		type: String,
		converter,
	})
	public item!: Fox;

	protected render(): TemplateResult {
		return html`
			<div class="item-card" data-id="${this.item.id}">
				<div class="item-card-img">
					<img src="../../../icons/all-items/${this.item.img}.png" alt="fox" />
					<button class="item-card-btn">
						<span class="plus-symbol">+</span>
						Add
					</button>
				</div>

				<div class="item-card-body">
					<div class="item-name">${this.item.name}</div>
					<div class="item-price">$${this.item.price.toFixed(2)}</div>
					<div class="item-rating">
						<fox-rating rating="${this.item.rating}"></fox-rating>
					</div>
					<div class="item-section">${this.item.section}</div>
				</div>
			</div>
		`;
	}
}
