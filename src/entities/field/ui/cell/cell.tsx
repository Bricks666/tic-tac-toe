import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

import styles from './cell.module.css';

export interface CellProps extends CommonProps {
	readonly badge?: React.ReactElement;
	readonly isFilled?: boolean;
}

export const Cell: React.FC<CellProps> = (props) => {
	const { badge, isFilled, className, } = props;
	return (
		<div
			className={cn(
				styles.cell,
				{ [styles['cell--filled']]: isFilled, },
				className
			)}
			tabIndex={isFilled ? -1 : 0}>
			{badge}
		</div>
	);
};
