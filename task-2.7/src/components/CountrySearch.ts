export type SearchCountryCb = (name: string) => void;

export class CountrySearch {
	private searchForm: HTMLFormElement;
	private searchInput: HTMLInputElement;
	private searchBtn: HTMLButtonElement;

	// TODO: move to CountryPage class
	// private searchService = new SearchService();

	constructor(private searchElement: HTMLDivElement, private searchCountry: SearchCountryCb) {
		this.searchForm = this.searchElement.querySelector<HTMLFormElement>('.search-form')!;
		this.searchInput = this.searchElement.querySelector<HTMLInputElement>('input[type="text"]')!;
		this.searchBtn = this.searchElement.querySelector<HTMLButtonElement>('.btn-search')!;
	}

	public setupListeners(): void {
		this.searchForm.addEventListener('submit', (event) => event.preventDefault());
		this.searchBtn.addEventListener('click', this.searchCountryByName);
	}

	private searchCountryByName = () => {
		const name = this.searchInput.value;
		if (name) {
			this.searchCountry(name);
		}
	};
}
