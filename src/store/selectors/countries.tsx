import { RootState } from '..';

export const getCountries = (state: RootState): string[] => state.dataCountries.value;
