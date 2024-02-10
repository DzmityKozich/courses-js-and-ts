import { FoxCardDef } from './entities/models';

export const buildFoxCard = (foxCardDef: FoxCardDef) => {
	const foxCard: HTMLDivElement = document.createElement('div');
	foxCard.classList.add('fox-card');
	foxCard.innerHTML = getHtml(foxCardDef);
	return foxCard;
};

const getHtml = (foxCardDef: FoxCardDef): string => {
	return `
	<div class="card-img">
		<img class="" src="${foxCardDef.imgSrc}">
	</div>
	<div class="card-title">
		${foxCardDef.title}
		<button class="btn-like">${foxCardDef.likes}</button>
	</div>
	<div class="card-content">${foxCardDef.text}</div>
	<a class="card-actions" href="${foxCardDef.learnMoreLink}">
		earn More >>
	</a>`;
};
