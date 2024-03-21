import { CountrySearchError } from '../models/types';
import { SearchService } from '../services/SearchService';
import { CountryList } from './CountryList';
import { CountrySearch, SearchCountryCb } from './CountrySearch';
import { RegionSelect, SelectRegionCb } from './RegionSelect';
import { ThemeToggle } from './ThemeToggle';

export class CountriesPage {
	private counrySearch: CountrySearch;
	private countryList: CountryList;
	private regionSelect: RegionSelect;
	private themeToggle: ThemeToggle;

	private searchService = new SearchService();

	constructor(private page: HTMLElement) {
		const countrySearch = this.page.querySelector<HTMLDivElement>('.search')!;
		this.counrySearch = new CountrySearch(countrySearch, this.onCountrySearch);
		this.counrySearch.setupListeners();
		const countryList = this.page.querySelector<HTMLDivElement>('.card-list')!;
		this.countryList = new CountryList(countryList);
		const reigonSelect = this.page.querySelector<HTMLDivElement>('.menu')!;
		this.regionSelect = new RegionSelect(reigonSelect, this.selectRegion);
		this.regionSelect.setupListeners();
		const themeToggle: HTMLButtonElement = this.page.querySelector('.theme-toggle-btn')!;
		this.themeToggle = new ThemeToggle(themeToggle);
		this.themeToggle.setupListeners();
	}

	private onCountrySearch: SearchCountryCb = (name) => {
		this.searchService
			.searchByName(name)
			.then((countries) => {
				this.countryList.update(countries);
			})
			.catch((err: CountrySearchError) => {
				console.log(err);
			});
	};

	private selectRegion: SelectRegionCb = (region) => {
		this.searchService
			.searchByRegion(region)
			.then((countries) => {
				this.countryList.update(countries);
			})
			.catch((err: CountrySearchError) => {
				console.log(err);
			});
	};
}
