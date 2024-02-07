import { createFoxCard } from '../fox-card-factory';
import { FoxType } from './models';

export class FoxCard {
	private element: HTMLElement;
	private likeBtn: HTMLButtonElement;

	constructor(public foxType: FoxType, title: string, text: string, imgSrc: string, private likes: number, readMoreLink: string = '') {
		const { card, cardContent, cardTitle, img, likeBtn } = createFoxCard();
		this.element = card;
		this.likeBtn = likeBtn;
		cardContent.textContent = text;
		cardTitle.textContent = title;
		img.src = imgSrc;
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
		this.likeBtn.textContent = `${++this.likes}`;
	};
}
