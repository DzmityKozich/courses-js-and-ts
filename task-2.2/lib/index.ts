import { FoxCard } from './entities/fox-card';
import { FoxList } from './entities/fox-list';

import '../scss/styles.scss';
import { FoxData } from './mock/fox-data';

const foxSelectors = document.querySelectorAll<HTMLInputElement>('input[name="fox-kind"]');
const foxListEL = document.querySelector<HTMLDivElement>('.fox-list')!;

const foxCards: FoxCard[] = FoxData.map(
	({ title, foxType, imgSrc, likes, readMoreLink, text }) => new FoxCard(foxType, title, text, imgSrc, likes, readMoreLink)
);
const foxList: FoxList = new FoxList(foxListEL, foxCards);

[...foxSelectors.values()].forEach((el) => {
	el.addEventListener('change', ({ target }: any) => {
		foxList.showCardsFor(target.value);
	});
});
