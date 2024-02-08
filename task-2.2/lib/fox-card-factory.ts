import { FoxCardDef } from './entities/models';

type FoxCardComponents = {
	foxCard: HTMLDivElement;
	cardImg: HTMLDivElement;
	cardTitle: HTMLDivElement;
	cardContent: HTMLDivElement;
	cardActions: HTMLAnchorElement;
	img: HTMLImageElement;
	likeBtn: HTMLButtonElement;
};

export type FoxCardElements = { card: HTMLDivElement } & FoxCardComponents;

export const createFoxCard = (foxCardDef: FoxCardDef): FoxCardElements => {
	const { foxCard, img, cardImg, cardActions, cardContent, cardTitle, likeBtn } = createElements();
	const card = design(
		foxCard,
		['fox-card'],
		[
			design(cardImg, ['card-img'], [design(img, [])]),
			design(cardTitle, ['card-title'], [design(likeBtn, ['btn-like'])], foxCardDef.title),
			design(cardContent, ['card-content'], [], foxCardDef.text),
			design(cardActions, ['card-actions'], [], 'Learn More >>'),
		]
	);
	return { card, foxCard, img, cardContent, cardTitle, likeBtn, cardActions, cardImg };
};

const design = <T extends HTMLElement>(parent: T, cssClasses: string[], children: HTMLElement[] = [], textContent: string = ''): T => {
	parent.classList.add(...cssClasses);
	parent.textContent = textContent;
	children.forEach((child) => {
		parent.appendChild(child);
	});
	return parent;
};

const createElements = (): FoxCardComponents => {
	const foxCard: HTMLDivElement = document.createElement('div');
	const cardImg: HTMLDivElement = document.createElement('div');
	const img: HTMLImageElement = document.createElement('img');
	const cardTitle: HTMLDivElement = document.createElement('div');
	const likeBtn: HTMLButtonElement = document.createElement('button');
	const cardContent: HTMLDivElement = document.createElement('div');
	const cardActions: HTMLAnchorElement = document.createElement('a');
	return { foxCard, cardActions, cardContent, cardImg, cardTitle, img, likeBtn };
};
