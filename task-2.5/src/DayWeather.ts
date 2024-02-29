import dayjs from 'dayjs';
import { DailyTemperature, Temperature, Weather } from './types';

import isToday from 'dayjs/plugin/isToday';
import utc from 'dayjs/plugin/utc';
import { HourForecast } from './ForecastResponce';

dayjs.extend(utc);
dayjs.extend(isToday);

export type DayName = 'Now' | 'Today' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

const WEEK_DAYS: Record<number, DayName> = {
	0: 'Sun',
	1: 'Mon',
	2: 'Tue',
	3: 'Wed',
	4: 'Thu',
	5: 'Fri',
	6: 'Sat',
};

export class DayWeather {
	public day: DayName;
	public weather: Weather | null;
	public temp: DailyTemperature;
	public date: dayjs.Dayjs;
	public sunrise: dayjs.Dayjs;
	public sunset: dayjs.Dayjs;

	constructor(date: dayjs.ConfigType, private forecast: HourForecast[], sunrise: dayjs.Dayjs, sunset: dayjs.Dayjs) {
		this.date = dayjs(date).startOf('day');
		this.sunrise = this.date.hour(sunrise.hour()).minute(sunrise.minute()).second(sunrise.second());
		this.sunset = this.date.hour(sunset.hour()).minute(sunset.minute()).second(sunset.second());
		this.day = this.findDay();
		this.temp = this.findTemp();
		this.weather = this.getWeather();
	}

	private findDay(): DayName {
		if (this.date.isToday() && this.forecast.length === 1) return 'Now';
		if (this.date.isToday()) return 'Today';
		return WEEK_DAYS[dayjs(this.date).day()];
	}

	private findTemp(): DailyTemperature {
		if (this.day === 'Now') {
			return { day: 'n/a', night: 'n/a', current: this.forecast[0].temp };
		}
		const current: Temperature = this.day === 'Today' ? this.forecast[0].temp : 'n/a';
		return { day: this.findAvgTempFor('day'), night: this.findAvgTempFor('night'), current };
	}

	private getWeather(): Weather | null {
		if (this.day === 'Now') return this.forecast[0].weather;
		const forecast = this.findForecastFor('day');
		if (!forecast?.length) return null;
		const index = Math.floor(forecast.length / 2);
		return forecast[index].weather;
	}

	private findAvgTempFor(time: 'day' | 'night'): Temperature {
		const forecast = this.findForecastFor(time);
		if (!forecast) return 'n/a';
		const temps = forecast.map(({ temp }) => temp);
		return temps.reduce((sum, temp) => (sum += temp), 0) / temps.length;
	}

	private findForecastFor(time: 'day' | 'night'): HourForecast[] | null {
		const index = this.forecast.findIndex(({ date }) => date.isAfter(this.sunset));
		if (index === -1) return null;
		const [startIndex, endIndex] = time === 'day' ? [0, index] : [index];
		return this.forecast.slice(startIndex, endIndex);
	}
}
