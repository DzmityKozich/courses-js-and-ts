import { Fox } from '../../models/Fox';
import { FilterForm, FoxItemsService } from '../../services/fox-items-service';
import { transformJson } from '../../common/convertors';
import { getStoreService } from '../../services/store-service';

import '../../../scss/styles.scss';
import './all-items.scss';

export class AllItemsPage {
	private itemList: HTMLDivElement;
	private itemsFilter: HTMLElement;

	private foxItemsService = new FoxItemsService();
	private storeService = getStoreService();

	constructor(private page: HTMLDivElement) {
		this.itemList = this.page.querySelector<HTMLDivElement>('.item-list')!;
		this.itemsFilter = this.page.querySelector('fox-items-filter')!;
	}

	public init() {
		this.itemsFilter.addEventListener('filter', this.onFilter);
		this.renderFoxCards(this.foxItemsService.getAllItems());
	}

	private onFilter = (event: any) => {
		const filter: FilterForm = event.detail.filter;
		const items = this.foxItemsService.getItemsByFilter(filter);
		this.renderFoxCards(items);
	};

	private renderFoxCards(foxItems: Fox[]): void {
		this.itemList.innerHTML = foxItems
			.map((item) => {
				const stringItem = transformJson(item);
				return `<fox-item-card item="${stringItem}"></fox-item-card>`;
			})
			.join('\n');
		this.setListeners();
	}

	private setListeners(): void {
		this.itemList.querySelectorAll('fox-item-card').forEach((card) => {
			card.addEventListener('add', ({ detail }: any) => this.addItemToBasket(detail));
		});
	}

	private addItemToBasket = (item: Fox) => {
		console.log(item);
		this.storeService.save({ amount: 1, item });
	};
}

const allItemsPage = new AllItemsPage(document.querySelector<HTMLDivElement>('#all-items')!);
allItemsPage.init();
