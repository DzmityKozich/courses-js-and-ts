import dayjs from 'dayjs';
import { DayWeather } from './DayWeather';
import { ForecastResponse, HourForecast } from './ForecastResponce';
import { Cord, Forecast, GeoCords, HourForecastDef, LocationSearchResult } from './types';

import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const API_KEY = '9742387702934c27a6a2b0f7fb002960';

function getLocationSearchURL(location: string): string {
	return `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=2&appid=${API_KEY}`;
}

function getForecastSearchURL(lat: Cord, lon: Cord, cnt: number = 40): string {
	return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=${cnt}`;
}

function getCurrentForecastSearchURL(lat: Cord, lon: Cord) {
	return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
}

interface DateForecast {
	[date: string]: HourForecast[];
}

export class ForecastSearchService {
	constructor() {}

	public async searchLocation(location: string): Promise<LocationSearchResult[]> {
		const locationUrl = getLocationSearchURL(location);
		const responce = await fetch(locationUrl);
		return responce.json();
	}

	public async getForecastFor(location: LocationSearchResult): Promise<Forecast> {
		const cords: GeoCords = { lat: location.lat, lon: location.lon };
		const forecast = await this.readForecast(cords);
		const weatherDaily = this.split(forecast.list, forecast.sunrise, forecast.sunset);
		const current = new HourForecast(await this.getCurrentForecast(cords));
		return {
			current: new DayWeather(new Date(), [current], forecast.sunrise, forecast.sunset),
			daily: weatherDaily,
			location,
		};
	}

	private split(res: HourForecast[], sunrise: dayjs.Dayjs, sunset: dayjs.Dayjs): DayWeather[] {
		const splited = this.splitByDate(res);
		this.splitByDays(splited, sunrise);
		return Object.entries(splited).map(([key, hf]) => new DayWeather(+key, hf, sunrise, sunset));
	}

	private splitByDate(res: HourForecast[]): DateForecast {
		return res.reduce((sorted, forecast) => {
			const day = dayjs(forecast.dt);
			if (day.isBefore(Date.now())) return sorted;
			const date = day.startOf('day').valueOf();
			return { ...sorted, [date]: [...(sorted[date] || []), forecast] };
		}, {} as DateForecast);
	}

	// TODO: create new object and retunt it
	private splitByDays(forecastByDate: DateForecast, sunrise: dayjs.ConfigType): void {
		Object.keys(forecastByDate).forEach((date, i, keys) => {
			const thatSunriseDate = this.setTimeBy(+date, sunrise);
			const index = forecastByDate[date].findIndex(({ dt }) => dayjs(dt).isAfter(thatSunriseDate));
			if (index > -1 && i > 0) {
				const yesterdayForecast = forecastByDate[keys[i - 1]];
				const lastNightForecast = forecastByDate[date].slice(0, index);
				const dateForecast = forecastByDate[date].slice(index);
				forecastByDate[date] = dateForecast;
				forecastByDate[keys[i - 1]] = [...yesterdayForecast, ...lastNightForecast];
			}
		});
	}

	private setTimeBy(date: dayjs.ConfigType, donorDate: dayjs.ConfigType): dayjs.Dayjs {
		const donor = dayjs(donorDate);
		return dayjs(date).hour(donor.hour()).minute(donor.minute()).second(donor.second()).millisecond(donor.millisecond());
	}

	private async getCurrentForecast(cords: GeoCords): Promise<HourForecastDef> {
		const { lat, lon } = cords;
		const res = await fetch(getCurrentForecastSearchURL(lat, lon));
		return res.json();
	}

	private async readForecast(cords: GeoCords): Promise<ForecastResponse> {
		const { lat, lon } = cords;
		const responce = await fetch(getForecastSearchURL(lat, lon));
		return new ForecastResponse(await responce.json());
	}
}
