import { createSlice } from '@reduxjs/toolkit';
import { Data } from '../interfaces/formData';

export interface DataState {
  value: Data;
  countries: string[];
  isUpdated: boolean;
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
  isUpdated: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDataValue: (state, action): void => {
      state.value = action.payload;
    },
    setCountries: (state, action): void => {
      state.countries = action.payload;
    },
    setIsUpdated: (state, action): void => {
      state.isUpdated = action.payload;
    },
  },
});

export const { setDataValue, setCountries, setIsUpdated } = dataSlice.actions;
export default dataSlice.reducer;
