import { WeatherSearch } from "./WeatherSearch";
import dayjs from "dayjs";

import "../scss/styles.scss";

const searchElement = document.querySelector<HTMLDivElement>(".search")!;

const weatherSearch = new WeatherSearch(searchElement);

// console.log(dayjs("2024-02-27").add(15, "hour"));
