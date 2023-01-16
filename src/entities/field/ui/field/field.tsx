import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { Cell } from '../cell';

import styles from './field.module.css';

export interface FieldProps extends CommonProps {}

const rows: Array<Array<number | null>> = [
	[0, null, null],
	[null, 1, null],
	[1, null, null]
];

export const Field: React.FC<FieldProps> = (props) => {
	const { className, } = props;

	return (
		<div className={cn(styles.field, className)}>
			{rows.map((row, i) => (
				<div className={styles.row} key={i}>
					{row.map((cell, i) => (
						<Cell badge={cell as any} isFilled={cell !== null} key={i} />
					))}
				</div>
			))}
		</div>
	);
};
