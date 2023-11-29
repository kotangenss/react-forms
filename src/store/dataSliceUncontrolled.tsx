import { createSlice } from '@reduxjs/toolkit';
import { Data } from '../interfaces/formData';

export interface DispatchData {
  payload: Data;
  type: 'data/setDataValue';
}

export interface DataState {
  value: Data;
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
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDataValue: (state, action): void => {
      state.value = action.payload;
    },
  },
});

export const { setDataValue } = dataSlice.actions;
export default dataSlice.reducer;
