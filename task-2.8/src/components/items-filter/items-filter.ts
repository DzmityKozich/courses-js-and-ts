import { customElement, state } from 'lit/decorators.js';
import { LitComponent } from '../../LitComponent';
import { TemplateResult, html } from 'lit';
import { FilterForm } from '../../services/fox-items-service';

import './items-filter.scss';

@customElement('fox-items-filter')
export class ItemsFilter extends LitComponent {
	@state()
	private form: FilterForm = { price: '', name: '', topic: '' };

	private changeFilter = (event: any) => {
		const { target } = event;
		(this.form as any)[target.name] = target.value;
		this.form = { ...this.form, [target.name]: target.value };
		this.dispatchEvent(new CustomEvent('filter', { detail: { filter: this.form } }));
	};

	protected render(): TemplateResult {
		return html`
			<form class="items-filter">
				<div class="filter-search">
					<input type="text" name="name" class="form-input" placeholder="Search" @change=${this.changeFilter} />
				</div>

				<div class="filter-topic">
					<label class="filter-label">Topic</label>
					<div class="filter-topic-options">
						<input type="radio" name="topic" id="all" value="" @change=${this.changeFilter} />
						<input type="radio" name="topic" id="forest" value="forest" @change=${this.changeFilter} />
						<input type="radio" name="topic" id="kids" value="foxkid" @change=${this.changeFilter} />
						<input type="radio" name="topic" id="other" value="other" @change=${this.changeFilter} />
						<label for="all" class="filter-topic-item"> All </label>
						<label for="forest" class="filter-topic-item"> Forest </label>
						<label for="kids" class="filter-topic-item"> Foxes kids </label>
						<label for="other" class="filter-topic-item"> Other </label>
					</div>
				</div>

				<div class="filter-price">
					<label class="filter-label">Price</label>
					<fox-range name="price" @rangeChange=${this.changeFilter}></fox-range>
					<div class="price-value">Value: $${this.form.price}</div>
				</div>
			</form>
		`;
	}
}
