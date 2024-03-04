import { CurrentWeather } from './CurrentWeather';
import { WeatherList } from './WeatherList';
import { WeatherSearch } from './WeatherSearch';
import { Forecast } from './types';

export class WeatherWidget {
	private weatherSearch: WeatherSearch;
	private weatherList: WeatherList;
	private currentWeather: CurrentWeather;

	constructor(private weatherWidget: HTMLDivElement) {
		const weatherSearch = this.weatherWidget.querySelector<HTMLDivElement>('.search')!;
		this.weatherSearch = new WeatherSearch(weatherSearch, this.onForecastSearch);
		const weatherList = this.weatherWidget.querySelector<HTMLDivElement>('.weather-list')!;
		this.weatherList = new WeatherList(weatherList);
		const currentWeather = this.weatherWidget.querySelector<HTMLDivElement>('.current-weather-card')!;
		this.currentWeather = new CurrentWeather(currentWeather);
	}

	private onForecastSearch = (forecast: Forecast) => {
		this.weatherList.update(forecast.daily);
		this.currentWeather.update(forecast.current, forecast.location);
	};
}
