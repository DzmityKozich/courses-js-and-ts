import { WeatherSearch } from './models/WeatherSearch';
import dayjs from 'dayjs';

import '../scss/styles.scss';
import { WeatherWidget } from './models/WeatherWidget';

// const searchElement = document.querySelector<HTMLDivElement>('.search')!;

// const weatherSearch = new WeatherSearch(searchElement);

const weatherWidgetElement = document.querySelector<HTMLDivElement>('.weather-widget')!;
const weatherWidget = new WeatherWidget(weatherWidgetElement);
