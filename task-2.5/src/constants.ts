import { Meteorology } from './models/types';

export const IMGS: Record<Meteorology, string> = {
	[Meteorology.Atmosphere]: 'icons/clouds.svg',
	[Meteorology.Clear]: 'icons/sun.svg',
	[Meteorology.Clouds]: 'icons/clouds.svg',
	[Meteorology.Drizzle]: 'icons/rain.svg',
	[Meteorology.Rain]: 'icons/rain.svg',
	[Meteorology.Snow]: 'icons/snow.svg',
	[Meteorology.Thunderstorm]: 'icons/storm.svg',
};
