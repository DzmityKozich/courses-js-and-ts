import { CountrySearchResponce } from '../models/types';

export class SearchService {
	public async searchByName(name: string): Promise<CountrySearchResponce> {
		const url = `${import.meta.env.VITE_SEARCH_BY_NAME_URL}/${name}`;
		const res = await fetch(url);
		return res.json();
	}
}
