import { SavedItem } from '../models/SavedItem';

const SAVED_ITEMS = 'SAVED_ITEMS';

let store: StoreService;

export function getStoreService(): StoreService {
	if (!store) {
		store = new StoreService();
		store.init();
	}
	return store;
}

export class StoreService {
	private items: SavedItem[] = [];

	public init(): void {
		const saved = localStorage.getItem(SAVED_ITEMS);
		if (saved) {
			this.items = JSON.parse(saved);
		}
	}

	public getAll(): SavedItem[] {
		return [...this.items];
	}

	public save(item: SavedItem): void {
		const saved = this.findItem(item.item.id);
		if (!saved) {
			this.items.push(item);
		} else {
			saved.amount += 1;
		}
		this.saveItems();
	}

	public update(item: SavedItem): void {
		const index = this.items.findIndex((itm) => item.item.id === itm.item.id);
		if (index > -1) {
			this.items.splice(index, 1, item);
			this.saveItems();
		}
	}

	public remove(item: SavedItem): void {
		const index = this.items.findIndex((itm) => item.item.id === itm.item.id);
		if (index > -1) {
			this.items.splice(index, 1);
			this.saveItems();
		}
	}

	private saveItems(): void {
		localStorage.setItem(SAVED_ITEMS, JSON.stringify(this.items));
	}

	private findItem(itemId: string): SavedItem | undefined {
		return this.items.find(({ item }) => item.id === itemId);
	}
}
