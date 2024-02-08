import { createFoxCard, FoxCardElements } from '../fox-card-factory';
import { FoxCardDef, FoxType } from './models';

export class FoxCard {
	public foxType: FoxType;

	private element: HTMLElement;
	private likeBtn: HTMLButtonElement;

	constructor(foxCardDef: FoxCardDef) {
		this.foxType = foxCardDef.foxType;
		const cardComponents = createFoxCard(foxCardDef);
		this.element = cardComponents.card;
		this.likeBtn = cardComponents.likeBtn;
		this.setupView(foxCardDef, cardComponents);
	}

	private setupView(foxCardDef: FoxCardDef, cardComponents: FoxCardElements): void {
		const { img, cardActions } = cardComponents;
		img.src = foxCardDef.imgSrc;
		this.likeBtn.textContent = `${foxCardDef.likes}`;
		this.likeBtn.addEventListener('click', this.onLikeClick);
		cardActions.href = foxCardDef.learnMoreLink;
	}

	public addTo(parent: Node): void {
		parent.appendChild(this.element);
	}

	public removeFrom(parent: Node): void {
		parent.removeChild(this.element);
	}

	public destroy(): void {
		this.likeBtn.removeEventListener('click', this.onLikeClick);
		this.element.remove();
	}

	public remove(): void {
		this.element.remove();
	}

	private onLikeClick = () => {
		let likes: number = this.likeBtn.textContent ? +this.likeBtn.textContent : 0;
		this.likeBtn.textContent = `${++likes}`;
	};
}
