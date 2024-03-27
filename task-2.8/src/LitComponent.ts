import { LitElement } from 'lit';

export class LitComponent extends LitElement {
	// NOTE: to avoid shadow DOM
	protected createRenderRoot(): HTMLElement | DocumentFragment {
		return this;
	}
}
