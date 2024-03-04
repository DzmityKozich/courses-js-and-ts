import { debounce } from '../common';
import { Forecast, GeoCords, LocationSearchResult } from './types';
import { ForecastSearchService } from './SearchService';

export class WeatherSearch {
	private service = new ForecastSearchService();

	constructor(private searchElement: HTMLDivElement, private forecastSearch: (forecast: Forecast) => void) {
		const inputDebounce = debounce(this.searchLocation, 300);
		this.inputElement.addEventListener('keydown', (event: any) => {
			setTimeout(() => inputDebounce(event.target.value));
		});
		this.inputElement.addEventListener('focus', (event: any) => {
			this.toggleDetails(event);
		});
		this.inputElement.addEventListener('blur', (event: any) => {
			this.hideDetails();
		});
		this.inputElement.addEventListener('click', (event: any) => {
			setTimeout(() => this.toggleDetails(event));
		});
	}

	private get inputElement(): HTMLInputElement {
		return this.searchElement.querySelector('input[type="search"]')!;
	}

	private get detailsElement(): HTMLDivElement {
		return this.searchElement.querySelector('.search-details')!;
	}

	private get selectedLocationElement(): HTMLDivElement {
		return this.searchElement.querySelector('.selected-location')!;
	}

	private searchLocation = (location: string) => {
		if (location) {
			this.service.searchLocation(location).then((data) => {
				this.showDetails();
				this.createMenu(data);
			});
		} else {
			this.detailsElement.innerHTML = '';
		}
	};

	private createMenu(searchResults: LocationSearchResult[]) {
		this.detailsElement.innerHTML = searchResults.map((location) => this.locationItemHTML(location)).join('\n');
		this.detailsElement.querySelectorAll('.details-item').forEach((detail, i) => {
			detail.addEventListener('mousedown', (event: any) => {
				event.stopPropagation();
				event.preventDefault();
				this.selectedLocationElement.innerHTML = `Selected: ${event.target.innerHTML}`;
				this.searchForecast(searchResults[i]);
			});
		});
	}

	private searchForecast(location: LocationSearchResult) {
		this.service.getForecastFor(location).then((data) => {
			this.hideDetails();
			this.forecastSearch(data);
		});
	}

	private locationItemHTML(location: LocationSearchResult): string {
		const { name, country, state } = location;
		const content = `${name}, ${state ? state + ',' : ''} ${country}`;
		return `<div class="details-item">${content}</div>`;
	}

	private showDetails(): void {
		this.detailsElement.style.display = 'block';
	}

	private hideDetails(): void {
		this.detailsElement.style.display = 'none';
	}

	private toggleDetails(event: any): void {
		const show = !!event.target.value;
		this.detailsElement.style.display = show ? 'block' : 'none';
	}
}
