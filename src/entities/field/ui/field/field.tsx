import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { useFieldState } from '../../lib';
import { Position } from '../../model';
import { Cell } from '../cell';

import styles from './field.module.css';

export interface FieldProps extends CommonProps {
	readonly onCellClick: (position: Position) => void;
}

export const Field: React.FC<FieldProps> = (props) => {
	const { className, onCellClick, } = props;

	const field = useFieldState();

	return (
		<div className={cn(styles.field, className)}>
			{field.map((row, i) => (
				<div className={styles.row} key={i}>
					{row.map((cell, i) => (
						<Cell {...cell} onClick={onCellClick} key={i} />
					))}
				</div>
			))}
		</div>
	);
};
