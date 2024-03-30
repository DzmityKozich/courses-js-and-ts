import foxes from '../../../db/foxes.json';

import '../../../scss/styles.scss';
import './all-items.scss';

export class AllItemsPage {
	private itemList: HTMLDivElement;

	constructor(private page: HTMLDivElement) {
		this.itemList = page.querySelector<HTMLDivElement>('.item-list')!;
	}

	public init() {
		this.itemList.innerHTML = foxes
			.map((item) => {
				const stringItem = JSON.stringify(item).replace(/"/g, "'");
				return `<fox-item-card item="${stringItem}"></fox-item-card>`;
			})
			.join('\n');
	}
}

const allItemsPage = new AllItemsPage(document.querySelector<HTMLDivElement>('#all-items')!);
allItemsPage.init();
