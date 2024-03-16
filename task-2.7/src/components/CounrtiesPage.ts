import { CountryList } from './CountryLIst';
import { CountrySearch, SearchCountryCb } from './CountrySearch';

export class CountriesPage {
	private counrySearch: CountrySearch;
	private countryList: CountryList;

	constructor(private page: HTMLElement) {
		const countrySearch = this.page.querySelector<HTMLDivElement>('.search')!;
		this.counrySearch = new CountrySearch(countrySearch, this.onCountrySearch);
		this.counrySearch.setupListeners();
		const countryList = this.page.querySelector<HTMLDivElement>('.container')!;
		this.countryList = new CountryList(countryList);
	}

	private onCountrySearch: SearchCountryCb = (err, res) => {
		if (!err) {
			console.log(res);
			this.countryList.update(res!);
		} else {
			if (err.status === 404) console.log('County not found :(');
			else console.log(err);
		}
	};
}
