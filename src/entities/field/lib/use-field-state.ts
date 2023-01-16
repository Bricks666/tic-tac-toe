import { useUnit } from 'effector-react';
import { fieldModel } from '../model';

export const useFieldState = () => {
	return useUnit(fieldModel.$fieldState);
};
