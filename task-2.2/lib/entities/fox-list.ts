import { FoxCard } from './fox-card';
import { FoxType } from './models';

export class FoxList {
	private cards: Map<FoxType, FoxCard[]> = new Map();
	private currentFoxType: FoxType | 'All' = 'All';

	constructor(private listEl: Node, cards: FoxCard[]) {
		this.fillCards(cards);
		// this.showAllCards();
	}

	private fillCards(cardList: FoxCard[]): void {
		cardList.forEach((card) => {
			const cards = this.cards.get(card.foxType) || [];
			this.cards.set(card.foxType, [card, ...cards]);
		});
	}

	public showAllCards(): void {
		this.currentFoxType = 'All';
		[...this.cards.values()].forEach((cards) => {
			cards.forEach((card) => card.addTo(this.listEl));
		});
	}

	public hideAllCards(): void {
		[...this.cards.values()].forEach((cards) => {
			cards.forEach((card) => card.remove());
		});
	}

	public showCardsFor(foxType: FoxType): void {
		if (this.currentFoxType === 'All') {
			this.hideAllCards();
		} else {
			this.cards.get(this.currentFoxType)?.forEach((card) => {
				card.remove();
			});
		}
		this.currentFoxType = foxType;
		this.cards.get(foxType)?.forEach((card) => {
			card.addTo(this.listEl);
		});
	}
}
