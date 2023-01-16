import { createEffect, createEvent, createStore, sample } from 'effector';
import { cellIsFilled, hasWinningCombination } from '../lib';
import { CellState, ClickCellParams, GenerateRowsParams, Row } from '../types';

export const $rows = createStore<Row[]>([]);
const $size = createStore(0);
export const $hasWinningCombination = createStore(false);

const needSequenceLength = 5;

export const $fieldState = $rows.map<CellState[][]>((rows) => {
	return rows.map((row, rowIndex) => {
		return row.map((column, columnIndex) => ({
			badge: column,
			position: {
				row: rowIndex,
				column: columnIndex,
			},
			isFilled: cellIsFilled(column),
		}));
	});
});

export const $isTotalFilled = $rows.map<boolean>((rows) => {
	return rows.map((row) => row.join('')).join('').length === rows.length ** 2;
});

// const $hasWinningCombination = combine($rows, (rows) => {
// 	const stopperIndex = rows.length - needSequenceLength;
// 	for (let i = 0; i < stopperIndex; i += 1) {
// 		for (let j = 0; j < stopperIndex; j += 1) {
// 			const down: Value<number> = {
// 				last: rows.at(i)?.at(j),
// 				findInLine: 0,
// 			};
// 			const mainDiagonal: Value<number> = {
// 				last: rows.at(i)?.at(j),
// 				findInLine: 0,
// 			};
// 			const subDiagonal: Value<number> = {
// 				last: rows.at(i)?.at(j + needSequenceLength - 1),
// 				findInLine: 0,
// 			};
// 			const left: Value<number> = {
// 				last: rows.at(i)?.at(j),
// 				findInLine: 0,
// 			};

// 			for (let k = 1; k < needSequenceLength; k += 1) {
// 				if (
// 					!down.0&
// 					!left.0&
// 					!mainDiagonal.0&
// 					!subDiagonal.0e
// 				) {
// 					break;
// 				}

// 				if (down.0{
// 					const nextDown = rows.at(i + k)?.at(j);

// 					down.findInLine = cellIsFilled(nextDown) && nextDown === down.0;
// 					down.last = nextDown;
// 				}

// 				if (mainDiagonal.0{
// 					const nextMainDiagonal = rows.at(i + k)?.at(j + k);

// 					mainDiagonal.0=
// 						cellIsFilled(nextMainDiagonal) &&
// 						nextMainDiagonal === mainDiagonal.last;
// 					mainDiagonal.last = nextMainDiagonal;
// 				}

// 				if (subDiagonal.0{
// 					const nextSubDiagonal = rows
// 						.at(i + k)
// 						?.at(j + needSequenceLength - 1 - k);

// 					subDiagonal.0=
// 						cellIsFilled(nextSubDiagonal) &&
// 						nextSubDiagonal === subDiagonal.last;
// 					subDiagonal.last = nextSubDiagonal;
// 				}

// 				if (left.0{
// 					const nextLeft = rows.at(i)?.at(j + k);

// 					left.findInLine = cellIsFilled(nextLeft) && nextLeft === left.0;
// 					left.last = nextLeft;
// 				}
// 			}

// 			console.log(
// 				down.findInLine || left.findInLine || mainDiagonal.findInLine || subDiagonal.0e
// 			);

// 			if (down.findInLine || left.findInLine || mainDiagonal.findInLine || subDiagonal.0{
// 				return true;
// 			}
// 		}
// 	}

// 	return false;
// });

$hasWinningCombination.watch((value) => {
	console.log('[TARGET]', value);
});

export const generateRowsFx = createEffect<GenerateRowsParams, Row[]>(
	({ size, }) => {
		return Array(size)
			.fill(null)
			.map(() => Array(size).fill(null));
	}
);

export const cellClicked = createEvent<ClickCellParams>();
const badgeWillSet = createEvent<ClickCellParams>();
export const badgeSet = createEvent<ClickCellParams>();

sample({
	clock: generateRowsFx.doneData,
	target: $rows,
});

sample({
	clock: cellClicked,
	source: $rows,
	filter: (field, { position, }) => {
		const row = field.at(position.row);

		if (!row) {
			return false;
		}

		const cell = row.at(position.column);

		return cell !== undefined && cell === null;
	},
	fn: (_, params) => params,
	target: badgeWillSet,
});

sample({
	clock: generateRowsFx,
	fn: ({ size, }) => size,
	target: $size,
});

sample({
	clock: badgeWillSet,
	source: $rows,
	fn: (field, { badge, position, }) => {
		const { column: columnIndex, row: rowIndex, } = position;
		return field.map((row, i) =>
			i === rowIndex
				? row.map((column, i) => (i === columnIndex ? badge : column))
				: row
		);
	},
	target: [$rows, badgeSet],
});

sample({
	clock: badgeWillSet,
	source: $rows,
	fn: (rows, { position, }) =>
		hasWinningCombination({
			needSequenceLength,
			getValue: (position) => {
				return rows.at(position.row)?.at(position.column);
			},
			position,
			isNotEmpty: cellIsFilled,
		}),
	target: $hasWinningCombination,
});

$hasWinningCombination.watch(console.log);
