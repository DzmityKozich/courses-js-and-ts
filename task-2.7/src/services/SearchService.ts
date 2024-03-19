import { CountrySearchResult } from '../models/types';

export class SearchService {
	public async searchByName(name: string): Promise<CountrySearchResult[]> {
		const url = `${import.meta.env.VITE_SEARCH_BY_NAME_URL}/${name}`;
		const res = await fetch(url);
		return new Promise(async (resolve, reject) => {
			const json = await res.json();
			if (Array.isArray(json)) {
				resolve(json);
			} else {
				reject(json);
			}
		});
	}

	public async searchByRegion(region: string): Promise<CountrySearchResult[]> {
		const url = `${import.meta.env.VITE_SEARCH_BY_RESION_URL}/${region}`;
		const res = await fetch(url);
		return new Promise(async (resolve, reject) => {
			const json = await res.json();
			if (Array.isArray(json)) {
				resolve(json);
			} else {
				reject(json);
			}
		});
	}
}
