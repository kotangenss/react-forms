import { createSlice } from '@reduxjs/toolkit';
import { Data } from '../interfaces/formData';

export interface DataState {
  value: Data;
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
  isUpdated: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDataValue: (state, action): void => {
      state.value = action.payload;
    },
    setIsUpdated: (state, action): void => {
      state.isUpdated = action.payload;
    },
  },
});

export const { setDataValue, setIsUpdated } = dataSlice.actions;
export default dataSlice.reducer;
