import { RootState } from '..';
import { Form } from '../dataSliceForms';

export const getForms = (state: RootState): Form[] => state.dataForms.value;
export const getIsUpdated = (state: RootState): boolean => state.dataForms.isUpdated;
