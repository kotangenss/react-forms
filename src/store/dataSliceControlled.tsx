import { createSlice } from '@reduxjs/toolkit';
import { Data } from '../interfaces/formData';

export interface DataState {
  value: Data;
  countries: string[];
}

const initialState: DataState = {
  value: {
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    image: '',
    acceptTerms: undefined,
  },
  countries: ['Country'],
};

const dataSlice = createSlice({
  name: 'dataControlled',
  initialState,
  reducers: {
    setDataValue: (state, action): void => {
      state.value = action.payload;
    },
    setCountries: (state, action): void => {
      state.countries = action.payload;
    },
  },
});

export const { setDataValue, setCountries } = dataSlice.actions;
export default dataSlice.reducer;
