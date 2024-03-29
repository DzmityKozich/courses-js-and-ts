import { customElement, property } from 'lit/decorators.js';
import { LitComponent } from '../../LitComponent';
import { TemplateResult, html, svg } from 'lit';

import './rating.scss';

@customElement('fox-rating')
export class Rating extends LitComponent {
	@property({ type: Number })
	public rating: number = 0;

	private getStarSvg(index: number) {
		const color = index + 1 <= this.rating ? '#CC5520' : '#FFF';
		return svg`
    <path stroke="#000" fill="${color}"
    d="M8.40564 0L6.61248 5.72927H0.811157L5.5049 9.26996L3.7119 15L8.40564 11.4578L13.0992 15L11.3062 9.26996L16 5.72927H10.1986L8.40564 0Z"
    />
  `;
	}

	protected render(): TemplateResult {
		return html`
			<div class="rating">
				${[1, 2, 3, 4, 5].map((_, i) => {
					return html`
						<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">${this.getStarSvg(i)}</svg>
					`;
				})}
			</div>
		`;
	}
}
