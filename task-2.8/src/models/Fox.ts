export class Fox {
	public id: string;
	public img: string;
	public name: string;
	public price: number;
	public rating: number;
	public section: string;

	constructor(foxJson: string) {
		const fox = JSON.parse(foxJson);
		this.id = fox.id;
		this.img = fox.img;
		this.name = fox.name;
		this.rating = fox.rating;
		this.price = fox.price;
		this.section = fox.section;
	}
}
