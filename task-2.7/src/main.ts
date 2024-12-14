import { themeChange } from 'theme-change';

import '../scss/styles.scss';
import { CountriesPage } from './components/CounrtiesPage';

themeChange();

const page = document.getElementById('app')!;

new CountriesPage(page);
