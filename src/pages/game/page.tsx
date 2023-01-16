import { useUnit } from 'effector-react';
import * as React from 'react';
import { Field } from '@/entities/field';
import { fieldControlModel } from './model';

export const GamePage: React.FC = () => {
	const onCellClick = useUnit(fieldControlModel.cellClicked);
	return <Field onCellClick={onCellClick} />;
};
