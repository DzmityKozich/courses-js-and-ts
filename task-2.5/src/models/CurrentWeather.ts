import { IMGS } from '../constants';
import { DayWeather } from './DayWeather';
import { LocationSearchResult } from './types';

export class CurrentWeather {
	constructor(private currentWeatherElement: HTMLDivElement) {}

	public update(forecast: DayWeather, location: LocationSearchResult): void {
		this.currentWeatherElement.style.display = 'flex';
		this.currentWeatherElement.innerHTML = this.getHtml(forecast, location.name);
	}

	private getHtml(forecast: DayWeather, city: string): string {
		const {
			temp: { current },
			weather,
		} = forecast;
		return `
          <div class="current-temp">${current} &#8451;</div>
          <div class="curent-weather-info">
            <div class="current-weather">${weather?.main}</div>
            <div class="current-location">${city}</div>
          </div>
          <div class="current-weather-img">
            <img src="${IMGS[weather!.main]}" alt="">
          </div>
    `;
	}
}
