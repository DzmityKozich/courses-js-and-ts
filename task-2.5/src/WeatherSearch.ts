import { LocationSearchResult } from "./types";

const API_KEY = "9742387702934c27a6a2b0f7fb002960";

function getLocationSearchURL(location: string): string {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=2&appid=${API_KEY}`;
}

async function readLocations(
  locationUrl: string
): Promise<LocationSearchResult[]> {
  const responce = await fetch(locationUrl);
  return responce.json();
}

function locationItemHTML(location: LocationSearchResult): string {
  const { name, country, state } = location;
  return `<div class="details-item">${name}, ${state}, ${country}</div>`;
}

export class WeatherSearch {
  constructor(private searchElement: HTMLDivElement) {
    this.searchInput.addEventListener("keydown", (event: any) => {
      setTimeout(() => this.searchLocation(event.target.value));
    });
  }

  private get searchInput(): HTMLInputElement {
    return this.searchElement.querySelector('input[type="search"]')!;
  }

  private get searchDetails(): HTMLDivElement {
    return this.searchElement.querySelector(".search-details")!;
  }

  private searchLocation(location: string) {
    console.log(location);
    if (location) {
      readLocations(getLocationSearchURL(location)).then((data) => {
        this.searchDetails.innerHTML = data
          .map((location) => locationItemHTML(location))
          .join("\n");
      });
    } else {
      this.searchDetails.innerHTML = "";
    }
  }
}
