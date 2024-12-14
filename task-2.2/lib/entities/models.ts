export enum FoxType {
	Fennec = 'Fennec',
	Arctic = 'Arctic',
	Kit = 'Kit',
	Red = 'Red',
	Pet = 'Pet',
}

export interface FoxCardDef {
	foxType: FoxType;
	title: string;
	text: string;
	imgSrc: string;
	likes: number;
	learnMoreLink: string;
}
