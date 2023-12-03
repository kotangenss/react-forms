import { createSlice } from '@reduxjs/toolkit';
import { Data } from '../interfaces/formData';

export interface DataState {
  value: Form[];
  isUpdated: boolean;
}

export interface Form {
  name: string;
  fields: Data;
}

const initialState: DataState = {
  value: [],
  isUpdated: false,
};

const dataSlice = createSlice({
  name: 'dataForms',
  initialState,
  reducers: {
    setData: (state, action): void => {
      const { name, fields } = action.payload;
      const newForm: Form = {
        name,
        fields,
      };

      state.value.push(newForm);
      state.isUpdated = true;
    },
    setIsUpdated: (state): void => {
      state.isUpdated = false;
    },
  },
});

export const { setData, setIsUpdated } = dataSlice.actions;
export default dataSlice.reducer;
