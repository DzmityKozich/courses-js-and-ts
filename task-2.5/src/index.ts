import { WeatherWidget } from './models/entities/UI/WeatherWidget';

import '../scss/styles.scss';

const weatherWidgetElement = document.querySelector<HTMLDivElement>('.weather-widget')!;
const weatherWidget = new WeatherWidget(weatherWidgetElement);
