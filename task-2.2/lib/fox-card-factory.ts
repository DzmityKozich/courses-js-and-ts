type FoxCardComponents = {
	foxCard: HTMLDivElement;
	cardImg: HTMLDivElement;
	cardTitle: HTMLDivElement;
	cardContent: HTMLDivElement;
	cardActions: HTMLDivElement;
	img: HTMLImageElement;
	likeBtn: HTMLButtonElement;
};

type FoxCardElements = { card: HTMLDivElement } & FoxCardComponents;

export const createFoxCard = (): FoxCardElements => {
	const { foxCard, img, cardImg, cardActions, cardContent, cardTitle, likeBtn } = createElements();
	const card = design(
		foxCard,
		['fox-card'],
		[
			design(cardImg, ['card-img'], [design(img, [])]),
			design(cardTitle, ['card-title'], [design(likeBtn, ['like-btn'])]),
			design(cardContent, ['card-content']),
			design(cardActions, ['card-actions']),
		]
	);
	return { card, foxCard, img, cardContent, cardTitle, likeBtn, cardActions, cardImg };
};

const design = <T extends HTMLElement>(parant: T, cssClasses: string[], children: HTMLElement[] = []): T => {
	parant.classList.add(...cssClasses);
	children.forEach((child) => {
		parant.appendChild(child);
	});
	return parant;
};

const createElements = (): FoxCardComponents => {
	const foxCard: HTMLDivElement = document.createElement('div');
	const cardImg: HTMLDivElement = document.createElement('div');
	const img: HTMLImageElement = document.createElement('img');
	const cardTitle: HTMLDivElement = document.createElement('div');
	const likeBtn: HTMLButtonElement = document.createElement('button');
	const cardContent: HTMLDivElement = document.createElement('div');
	const cardActions: HTMLDivElement = document.createElement('div');
	return { foxCard, cardActions, cardContent, cardImg, cardTitle, img, likeBtn };
};
