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
	private isOpen: boolean = false;

	@state()
	private items: SavedItem[] = [];

	private storeServie = getStoreService();

	private closeSidebar = () => {
		this.isOpen = false;
		document.body.classList.remove('non-scroll');
	};

	connectedCallback(): void {
		super.connectedCallback();
		sidebarToggle.onToggle((state) => {
			this.isOpen = state === 'open';
			document.body.classList.toggle('non-scroll', this.isOpen);
			this.isOpen && this.loadSavedItems();
		});
	}

	private loadSavedItems(): void {
		this.items = this.storeServie.getAll();
	}

	private updateItem = (item: SavedItem) => {
		this.storeServie.update(item);
		this.items = this.storeServie.getAll();
	};

	private removeItem = (item: SavedItem) => {
		this.storeServie.remove(item);
		this.items = this.storeServie.getAll();
	};

	protected render(): TemplateResult {
		const classes = { open: this.isOpen };
		return html` <div class="sidebar ${classMap(classes)}">
			<div class="backdrop" @click=${this.closeSidebar}></div>
			<div class="sidebar-content">
				<div class="sidebar-close">
					<button class="sidebar-close-btn" @click=${this.closeSidebar}>&times;</button>
				</div>
				<div class="sidebar-header">
					<div class="sidebar-subtitle">box</div>
					<div class="sidebar-title">Your Bag</div>
				</div>
				<div class="saved-items">
					${repeat(
						this.items,
						(item) => item.item.id,
						(item) => {
							const itemAttr = transformJson(item);
							return html`<fox-saved-item-card
								item=${itemAttr}
								@itemChange=${({ detail }: CustomEvent) => this.updateItem(detail)}
								@remove=${({ detail }: CustomEvent) => this.removeItem(detail)}
							></fox-saved-item-card>`;
						}
					)}
				</div>
			</div>
		</div>`;
	}
}
