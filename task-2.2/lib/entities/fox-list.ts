import { FoxCard } from './fox-card';
import { FoxType } from './models';

export class FoxList {
	private cards: Map<FoxType, FoxCard[]> = new Map();
	private currentFoxType: FoxType = FoxType.Red;

	constructor(private listEl: Node, cards: FoxCard[]) {
		this.fillCards(cards);
		// FIXME: add All fox type
		this.showCardsFor(this.currentFoxType);
	}

	private fillCards(cardList: FoxCard[]): void {
		cardList.forEach((card) => {
			const cards = this.cards.get(card.foxType) || [];
			this.cards.set(card.foxType, [card, ...cards]);
		});
	}

	public showCardsFor(foxType: FoxType) {
		this.cards.get(this.currentFoxType)?.forEach((card) => {
			card.remove();
		});
		this.currentFoxType = foxType;
		this.cards.get(foxType)?.forEach((card) => {
			card.addTo(this.listEl);
		});
	}
}
