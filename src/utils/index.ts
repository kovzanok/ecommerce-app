import { getAllCountries } from 'countries-and-timezones';
import { Country } from '../types';

export default function getCountriesArray(): Country[] {
  const getAllCountriesObjectValues = Object.values(getAllCountries());
  return getAllCountriesObjectValues.map((el) => ({
    label: el.name,
    value: el.id,
  }));
}
