/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { CellState, Position } from '../../types';

import styles from './cell.module.css';

export interface CellProps extends CommonProps, CellState {
	readonly onClick: (params: Position) => unknown;
}

export const Cell: React.FC<CellProps> = (props) => {
	const { badge, isFilled, position, onClick, className, } = props;

	const clickHandler = () => {
		onClick(position);
	};

	return (
		<div
			className={cn(
				styles.cell,
				{ [styles['cell--filled']]: isFilled, },
				className
			)}
			onClick={isFilled ? undefined : clickHandler}
			tabIndex={isFilled ? -1 : 0}>
			{badge}
		</div>
	);
};
