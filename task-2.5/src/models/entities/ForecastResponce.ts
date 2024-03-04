import dayjs from 'dayjs';
import { ForecastResponseDef, HourForecastDef, Weather } from '../types';

export class ForecastResponse {
	public list: HourForecast[];
	public sunrise: dayjs.Dayjs;
	public sunset: dayjs.Dayjs;
	public city: {
		id: number;
		name: string;
		coord: {
			lat: number;
			lon: number;
		};
		country: string;
		timezone: number;
	};

	constructor(forecast: ForecastResponseDef) {
		const { sunrise, sunset, ...rest } = forecast.city;
		this.city = rest;
		this.sunrise = dayjs(sunrise * 1000);
		this.sunset = dayjs(sunset * 1000);
		this.list = forecast.list.map((item) => new HourForecast(item));
	}
}

export class HourForecast {
	public dt: number;
	public dt_txt: string;
	public date: dayjs.Dayjs;
	public temp: number;
	public feels_like: number;
	public weather: Weather;

	constructor(forcast: HourForecastDef) {
		this.dt = forcast.dt * 1000;
		this.dt_txt = dayjs(this.dt).format();
		this.date = dayjs(this.dt);
		this.feels_like = forcast.main.feels_like;
		this.temp = forcast.main.temp;
		this.weather = forcast.weather[0];
	}
}
