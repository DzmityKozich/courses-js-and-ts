import { CountrySearchError, CountrySearchResult } from '../models/types';
import { SearchService } from '../services/SearchService';

export type SearchCountryCb = (error: CountrySearchError | null, result: CountrySearchResult[] | null) => void;

export class CountrySearch {
	private searchForm: HTMLFormElement;
	private searchInput: HTMLInputElement;
	private searchBtn: HTMLButtonElement;

	// TODO: move to CountryPage class
	private searchService = new SearchService();

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
			this.searchService.searchByName(name).then((res) => {
				if (Array.isArray(res)) {
					this.searchCountry(null, res);
				} else {
					this.searchCountry(res, null);
				}
			});
		}
	};
}
