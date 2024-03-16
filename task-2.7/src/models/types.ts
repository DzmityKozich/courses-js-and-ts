export interface CountrySearchResult {
	name: {
		common: string;
		official: string;
	};
	region: string;
	population: number;
	flags: {
		alt: string;
		svg: string;
		png: string;
	};
	capital?: string[];
}

export interface CountrySearchError {
	status: number;
	message: string;
}

export type CountrySearchResponce = CountrySearchResult[] | CountrySearchError;
