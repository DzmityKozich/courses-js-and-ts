import { CountrySearchResult } from '../models/types';

export class CountryList {
	constructor(private listElement: HTMLDivElement) {}

	public update(countries: CountrySearchResult[]): void {
		this.listElement.innerHTML = countries.map((c) => this.getCountryCardHtml(c)).join('\n');
	}

	private getCountryCardHtml(country: CountrySearchResult): string {
		return `
    <div class="country-card">
      <div class="card-img">
        <img src="${country.flags.svg}" alt="${country.flags.alt}">
      </div>

      <div class="card-body">
        <div class="country-name">${country.name.official}</div>
        <div class="country-stat">
          <span class="stat-title">Population</span>
          <span class="stat-value">${this.formatPopulationNuber(country.population)}</span>
        </div>
        <div class="country-stat">
          <span class="stat-title">Region</span>
          <span class="stat-value">${country.region}</span>
        </div>
        <div class="country-stat">
          <span class="stat-title">Capital</span>
          <span class="stat-value">${this.getCapital(country.capital)}</span>
        </div>
      </div>
    </div>
    `;
	}

	private formatPopulationNuber(popeulation: number) {
		return popeulation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}

	private getCapital(capital: string[] | undefined): string {
		if (!capital) return 'Has no capital';
		if (capital.length === 1) return capital[0];
		return `${capital.slice(0, -2).join(', ')}${capital.flat(-1)}`;
	}
}
