/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_WEATHER_API_KEY: string;
	readonly VITE_LOCATION_SEARCH_URL: string;
	readonly VITE_FORECAST_SEARCH_URL: string;
	readonly VITE_CURRENT_FORECAST_SEARCH_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
