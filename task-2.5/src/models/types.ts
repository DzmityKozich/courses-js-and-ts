import { DayWeather } from './DayWeather';

export enum Meteorology {
	Thunderstorm = 'Thunderstorm',
	Drizzle = 'Drizzle',
	Rain = 'Rain',
	Snow = 'Snow',
	Atmosphere = 'Atmosphere',
	Clear = 'Clear',
	Clouds = 'Clouds',
}

export type Temperature = number | 'n/a';

export interface Forecast {
	current: DayWeather;
	daily: DayWeather[];
	location: LocationSearchResult;
}

export interface Weather {
	id: number;
	main: Meteorology;
	description: string;
}

export interface LocationSearchResult {
	country: string;
	lat: number;
	lon: number;
	name: string;
	state: string;
}

export type Cord = number | string;

export interface GeoCords {
	lat: Cord;
	lon: Cord;
}

export interface DailyTemperature {
	current: Temperature;
	day: Temperature;
	night: Temperature;
}

export interface ForecastResponseDef {
	cod: string;
	message: number;
	cnt: number;
	list: HourForecastDef[];
	city: {
		id: number;
		name: string;
		coord: {
			lat: number;
			lon: number;
		};
		country: string;
		timezone: number;
		sunrise: number;
		sunset: number;
	};
}

export interface HourForecastDef {
	dt: number;
	dt_txt: string;
	main: {
		temp: number;
		feels_like: number;
	};
	weather: {
		id: number;
		main: Meteorology;
		description: string;
		icon: string;
	}[];
}
