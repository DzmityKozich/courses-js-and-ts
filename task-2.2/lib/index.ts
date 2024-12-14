import { FoxCard } from './entities/fox-card';
import { FoxList } from './entities/fox-list';
import { FoxData } from './mock/fox-data';

import '../scss/styles.scss';

const foxSelectors = document.querySelectorAll<HTMLInputElement>('input[name="fox-kind"]');
const foxListEL = document.querySelector<HTMLDivElement>('.fox-list')!;

const foxCards: FoxCard[] = FoxData.map((card) => new FoxCard(card));
const foxList: FoxList = new FoxList(foxListEL, foxCards);
foxList.showAllCards();

[...foxSelectors.values()].forEach((el) => {
	el.addEventListener('change', ({ target }: any) => {
		const selected = target.value;
		if (selected === 'All') {
			foxList.showAllCards();
		} else {
			foxList.showCardsFor(selected);
		}
	});
});
