import { createSlice } from '@reduxjs/toolkit';
import countryList from '../utils/countries';

export interface DataState {
  value: string[];
}

const initialState: DataState = {
  value: countryList,
};

const dataSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default dataSlice.reducer;
