import { buildFoxCard } from '../fox-card-factory';
import { FoxCardDef, FoxType } from './models';

export class FoxCard {
	public foxType: FoxType;

	private element: HTMLElement;
	private likeBtn: HTMLButtonElement;

	constructor(foxCardDef: FoxCardDef) {
		this.foxType = foxCardDef.foxType;
		this.element = buildFoxCard(foxCardDef);
		this.likeBtn = this.element.querySelector('.btn-like')!;
		this.likeBtn.addEventListener('click', this.onLikeClick);
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
