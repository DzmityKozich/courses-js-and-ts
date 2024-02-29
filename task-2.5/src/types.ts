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

export interface GeoCords {
	lat: string;
	lon: string;
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

let x = {
	cod: '200',
	message: 0,
	cnt: 1,
	list: [
		{
			dt: 1708862400,
			main: {
				temp: 12.22,
				feels_like: 10.67,
				temp_min: 10.75,
				temp_max: 12.22,
				pressure: 1016,
				sea_level: 1016,
				grnd_level: 1003,
				humidity: 45,
				temp_kf: 1.47,
			},
			weather: [
				{
					id: 800,
					main: 'Clear',
					description: 'clear sky',
					icon: '01n',
				},
			],
			clouds: {
				all: 0,
			},
			wind: {
				speed: 3.55,
				deg: 192,
				gust: 12.83,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: 'n',
			},
			dt_txt: '2024-02-25 12:00:00',
		},
	],
	city: {
		id: 4133367,
		name: 'Texarkana',
		coord: {
			lat: 33.44,
			lon: -94.04,
		},
		country: 'US',
		population: 29919,
		timezone: -21600,
		sunrise: 1708865398,
		sunset: 1708906137,
	},
};
