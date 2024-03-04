import { IMGS } from '../constants';
import { DayWeather } from './DayWeather';

export class WeatherList {
	constructor(private weatherList: HTMLDivElement) {}

	public update(forecast: DayWeather[]): void {
		this.weatherList.innerHTML = '';
		const html = forecast
			.filter((f) => f.weather)
			.map((f) => this.getHtml(f))
			.join('\n');
		this.weatherList.innerHTML = html;
	}

	private getHtml(forecast: DayWeather): string {
		const {
			temp: { day, night },
			weather,
		} = forecast;
		return `
          <div class="weather-item">
            <div class="day">${forecast.day}</div>
            <div class="img">
              <img src="${this.getWeatherImg(forecast)}" alt="rain">
            </div>
            <div class="weather">${weather?.main}</div>
            <div class="forecast">
              <div class="time">Day</div>
              <div class="temperature">${day} &#8451;</div>
              <div class="temperature">${night} &#8451;</div>
              <div class="time">Night</div>
            </div>
          </div>`;
	}

	private getWeatherImg(forecast: DayWeather): string {
		if (!forecast.weather?.main) return '';
		return IMGS[forecast.weather?.main];
	}
}
