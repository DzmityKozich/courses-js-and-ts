import { TemplateResult, html } from 'lit';
import { LitComponent } from '../../LitComponent';
import { customElement, state } from 'lit/decorators.js';
import { sidebarToggle } from './sidebar-toggle';
import { classMap } from 'lit/directives/class-map.js';
import { StoreService, getStoreService } from '../../services/store-service';
import { SavedItem } from '../../models/SavedItem';
import { repeat } from 'lit/directives/repeat.js';
import { transformJson } from '../../common/convertors';
import '../saved-item-card/saved-item-card';

import './sidebar.scss';

@customElement('fox-sidebar')
export class Sidebar extends LitComponent {
	@state()
	private isOpen: boolean = true;

	@state()
	private items: SavedItem[] = [];

	private storeServie = getStoreService();

	private onBackdropClick = () => {
		this.isOpen = false;
	};

	connectedCallback(): void {
		super.connectedCallback();
		sidebarToggle.onToggle((state) => {
			this.isOpen = state === 'open';
			this.isOpen && this.loadSavedItems();
		});
	}

	private loadSavedItems(): void {
		this.items = this.storeServie.getAll();
		console.log(this.items);
	}

	private updateItem = (item: SavedItem) => {
		this.storeServie.update(item);
		this.items = this.storeServie.getAll();
	};

	protected render(): TemplateResult {
		const classes = { open: this.isOpen };
		return html` <div class="sidebar ${classMap(classes)}">
			<div class="backdrop" @click=${this.onBackdropClick}></div>
			<div class="sidebar-content">
				${repeat(
					this.items,
					(item) => item.item.id,
					(item) => {
						const itemAttr = transformJson(item);
						return html`<fox-saved-item-card
							item=${itemAttr}
							@itemChange=${({ detail }: CustomEvent) => this.updateItem(detail)}
						></fox-saved-item-card>`;
					}
				)}
			</div>
		</div>`;
	}
}
