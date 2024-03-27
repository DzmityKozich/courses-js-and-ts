import { TemplateResult, html, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LitComponent } from '../LitComponent';

@customElement('fox-icon')
export class Icon extends LitComponent {
	@property({ type: String })
	public iconPath!: string;

	@property({ type: String })
	public color!: string;

	@state()
	private icon: any = '';

	connectedCallback(): void {
		super.connectedCallback();
		console.log(html`<div>hello</div>`);
		this.fetchIcon().then((icon) => {
			console.log(icon);
			this.icon = icon;
		});
	}

	private async fetchIcon(): Promise<any> {
		const url = `${import.meta.env.VITE_APP_URL}/icons/${this.iconPath}`;
		try {
			const res = await fetch(url);
			const svgAsString = await res.text();
			console.log(svgAsString);
			return html`${svgAsString}`;
		} catch (error) {
			console.log(error);
			return '';
		}
	}

	protected render(): TemplateResult {
		return html`${this.icon}`;
	}
}
