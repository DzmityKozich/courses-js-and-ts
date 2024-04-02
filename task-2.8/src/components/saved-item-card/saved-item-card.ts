import { customElement, property } from 'lit/decorators.js';
import { LitComponent } from '../../LitComponent';
import { TemplateResult, html } from 'lit';
import { SavedItem } from '../../models/SavedItem';
import { jsonConverter } from '../../common/convertors';

import './saved-item-card.scss';

const converter = (incomeValue: string | null): SavedItem | null => {
	if (!incomeValue) return null;
	return JSON.parse(jsonConverter(incomeValue));
};

@customElement('fox-saved-item-card')
export class SavedItemCard extends LitComponent {
	@property({ type: String, converter })
	public item!: SavedItem;

	private add = (): void => {
		this.item.amount += 1;
		this.emitEvent();
	};

	private subtract = () => {
		this.item.amount -= 1;
		this.emitEvent();
	};

	private emitRemoveEvent = () => {
		this.dispatchEvent(new CustomEvent('remove', { detail: this.item }));
	};

	private emitEvent(): void {
		this.dispatchEvent(new CustomEvent('itemChange', { detail: this.item }));
	}

	protected render(): TemplateResult {
		return html`
			<div class="saved-item-card">
				<div class="saved-item-card-body">
					<div class="saved-item-card-img">
						<img src="../../../icons/all-items/${this.item.item.img}.png" />
					</div>

					<div class="saved-item-card-info">
						<div class="saved-item-item-name">${this.item.item.name}</div>
						<div class="saved-item-item-price">$${this.item.item.price.toFixed(2)}</div>
					</div>
				</div>

				<div class="saved-item-card-actions">
					<div class="counter">
						<button class="counter-btn" @click=${this.add}>+</button>
						<div class="counter-amount">${this.item.amount}</div>
						<button class="counter-btn" @click=${this.subtract}>-</button>
					</div>

					<button class="remove-btn" @click=${this.emitRemoveEvent}>Remove</button>
				</div>
			</div>
		`;
	}
}
