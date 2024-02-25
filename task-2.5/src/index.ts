import { WeatherSearch } from "./WeatherSearch";

import "../scss/styles.scss";

const searchElement = document.querySelector<HTMLDivElement>(".search")!;

const weatherSearch = new WeatherSearch(searchElement);
