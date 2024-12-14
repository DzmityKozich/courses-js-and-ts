import { LitComponent } from '../../LitComponent';
import { customElement, property } from 'lit/decorators.js';
import { TemplateResult, html } from 'lit';

import './page-title.scss';

@customElement('fox-page-title')
export class PageTitle extends LitComponent {
	@property({ type: String })
	public pageTitle: string = '';

	@property({ type: String })
	public subTitle: string = '';

	protected render(): TemplateResult {
		return html`
			<div class="page-title">
				<div class="page-title-sub">${this.subTitle}</div>
				<div class="page-title-main">${this.pageTitle}</div>
			</div>
		`;
	}
}
