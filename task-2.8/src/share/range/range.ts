import { customElement } from 'lit/decorators.js';
import { LitComponent } from '../../LitComponent';
import { TemplateResult, html } from 'lit';

import './range.scss';

@customElement('fox-range')
export class Range extends LitComponent {
	private onInput = ({ target }: any) => {
		const tempSliderValue = target.value;
		const progress = (tempSliderValue / 100) * 100;
		target.style.background = `linear-gradient(to right, #cc5520 ${progress}%, transparent ${progress}%)`;
		this.dispatchEvent(new CustomEvent('rangeChange', { detail: { value: target.value } }));
	};

	protected render(): TemplateResult {
		return html` <input class="fox-range" type="range" min="0" max="100" value="0" id="range" @input=${this.onInput} /> `;
	}
}
