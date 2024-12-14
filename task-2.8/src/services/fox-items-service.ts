import foxes from '../../db/foxes.json';
import { Fox } from '../models/Fox';

export interface FilterForm {
	name: string;
	topic: string;
	price: string;
}

export class FoxItemsService {
	public getAllItems(): Fox[] {
		return foxes;
	}

	public getItemById(id: string): Fox | undefined {
		return foxes.find((item) => item.id === id);
	}

	public getItemsByFilter(filter: FilterForm): Fox[] {
		return foxes.filter((item) => {
			return this.filterByName(item, filter.name) && this.filterByPrice(item, filter.price) && this.filterByTopic(item, filter.topic);
		});
	}

	private filterByName(item: Fox, nameValue: string): boolean {
		if (!nameValue) return true;
		return item.name.includes(nameValue);
	}

	private filterByTopic(item: Fox, topicValue: string): boolean {
		if (!topicValue) return true;
		return item.section === topicValue;
	}

	private filterByPrice(item: Fox, priceValue: string): boolean {
		if (!priceValue) return true;
		return item.price <= +priceValue;
	}
}
