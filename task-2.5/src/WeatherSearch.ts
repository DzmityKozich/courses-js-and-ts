import { DayWeather } from './DayWeather';
import { ForecastResponse, HourForecast } from './ForecastResponce';
import { debounce } from './common';
import { ForecastResponseDef, GeoCords, HourForecastDef, LocationSearchResult } from './types';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const API_KEY = '9742387702934c27a6a2b0f7fb002960';

function getLocationSearchURL(location: string): string {
	return `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=2&appid=${API_KEY}`;
}

function getForecastSearchURL(lat: string, lon: string, cnt: number = 40): string {
	return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=${cnt}`;
}

function getCurrentForecastSearchURL(lat: string, lon: string) {
	return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
}

// TODO: Use only for UI
export class WeatherSearch {
	private service = new ForecastSearchService();

	constructor(private searchElement: HTMLDivElement) {
		const inputDebounce = debounce(this.searchLocation, 300);
		this.inputElement.addEventListener('keydown', (event: any) => {
			setTimeout(() => inputDebounce(event.target.value));
		});
	}

	private get inputElement(): HTMLInputElement {
		return this.searchElement.querySelector('input[type="search"]')!;
	}

	private get detailsElement(): HTMLDivElement {
		return this.searchElement.querySelector('.search-details')!;
	}

	private searchLocation = (location: string) => {
		if (location) {
			this.readLocations(getLocationSearchURL(location)).then((data) => {
				this.createMenu(data);
			});
		} else {
			this.detailsElement.innerHTML = '';
		}
	};

	private createMenu(searchResults: LocationSearchResult[]) {
		this.detailsElement.innerHTML = searchResults.map((location) => this.locationItemHTML(location)).join('\n');
		this.detailsElement.querySelectorAll('.details-item').forEach((detail) => {
			detail.addEventListener('click', (event: any) => {
				console.log(event.target.dataset);
				this.searchForecast(event.target.dataset);
			});
		});
	}

	private searchForecast({ lat, lon }: GeoCords) {
		this.service.getForecastFor({ lat, lon }).then((data) => {
			console.log(data);
		});
	}

	private async readForecast(forecastUrl: string): Promise<any> {
		const responce = await fetch(forecastUrl);
		return responce.json();
	}

	private async readLocations(locationUrl: string): Promise<LocationSearchResult[]> {
		const responce = await fetch(locationUrl);
		return responce.json();
	}

	private locationItemHTML(location: LocationSearchResult): string {
		const { name, country, state, lat, lon } = location;
		return `<div class="details-item" data-lat="${lat}" data-lon="${lon}">${name}, ${state}, ${country}</div>`;
	}
}

// TODO: Use for search
class ForecastSearchService {
	constructor() {}

	public async getForecastFor(cords: GeoCords): Promise<{ current: DayWeather; daily: DayWeather[] }> {
		const forecast = await this.readForecast(cords);
		const weatherDaily = this.split(forecast.list, forecast.sunrise, forecast.sunset);
		const current = new HourForecast(await this.getCurrentForecast(cords));
		return {
			current: new DayWeather(new Date(), [current], forecast.sunrise, forecast.sunset),
			daily: weatherDaily,
		};
	}

	private split(res: HourForecast[], sunrise: dayjs.Dayjs, sunset: dayjs.Dayjs): DayWeather[] {
		const splited = this.splitByDate(res);
		Object.keys(splited).forEach((date, i, keys) => {
			const thatSunriseDate = this.setTimeBy(date, sunrise);
			const index = splited[date].findIndex(({ dt }) => dayjs(dt).isAfter(thatSunriseDate));
			if (index > -1 && i > 0) {
				const yesterdayForecast = splited[keys[i - 1]];
				const lastNightForecast = splited[date].slice(0, index);
				const dateForecast = splited[date].slice(index);
				splited[date] = dateForecast;
				splited[keys[i - 1]] = [...yesterdayForecast, ...lastNightForecast];
			}
		});
		console.log(splited);
		return Object.entries(splited).map(([key, hf]) => new DayWeather(key, hf, sunrise, sunset));
	}

	private setTimeBy(date: dayjs.ConfigType, donorDate: dayjs.ConfigType): dayjs.Dayjs {
		const donor = dayjs(donorDate);
		return dayjs(date).hour(donor.hour()).minute(donor.minute()).second(donor.second()).millisecond(donor.millisecond());
	}

	private splitByDate(res: HourForecast[]): { [date: string]: HourForecast[] } {
		return res.reduce((sorted, forecast) => {
			const day = dayjs(forecast.dt);
			if (day.isBefore(Date.now())) return sorted;
			const date = day.format('YYYY-MM-DD');
			return { ...sorted, [date]: [...(sorted[date] || []), forecast] };
		}, {} as { [date: string]: HourForecast[] });
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
