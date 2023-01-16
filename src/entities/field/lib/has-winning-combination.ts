/* eslint-disable no-restricted-syntax */
import { Position } from '../types';

export interface HasWinningCombinationParams<T> {
	readonly position: Position;
	readonly needSequenceLength: number;
	readonly getValue: (position: Position) => T | null | undefined;
	readonly isNotEmpty: (value: T | null | undefined) => value is T;
}

interface Direction {
	findInLine: number;
	getPosition: (offset: number) => Position;
}

export const hasWinningCombination = <T>(
	params: HasWinningCombinationParams<T>
): boolean => {
	const { needSequenceLength, position, getValue, isNotEmpty, } = params;
	const target = getValue(position);

	if (!isNotEmpty(target)) {
		return false;
	}

	const column = createDirection({
		basePosition: {
			column: position.column,
			row: position.row - needSequenceLength,
		},
		coefficients: {
			column: 0,
			row: 1,
		},
	});
	const main = createDirection({
		basePosition: {
			column: position.column - needSequenceLength + 1,
			row: position.row - needSequenceLength + 1,
		},
		coefficients: {
			row: 1,
			column: 1,
		},
	});

	const sub = createDirection({
		basePosition: {
			column: position.column + needSequenceLength - 1,
			row: position.row - needSequenceLength + 1,
		},
		coefficients: {
			column: -1,
			row: 1,
		},
	});
	const row = createDirection({
		basePosition: {
			column: position.column - needSequenceLength,
			row: position.row,
		},
		coefficients: {
			column: 1,
			row: 0,
		},
	});

	const directions = [column, row, main, sub];

	const iterationCount = needSequenceLength * 2 - 1;

	for (let iteration = 0; iteration < iterationCount; iteration += 1) {
		for (const direction of directions) {
			const position = direction.getPosition(iteration);

			const value = getValue(position);
			if (value === target) {
				direction.findInLine += 1;

				if (direction.findInLine === needSequenceLength) {
					return true;
				}
			} else {
				direction.findInLine = 0;
			}
		}
	}

	return false;
};

interface Coefficients {
	readonly row: number;
	readonly column: number;
}

interface CreateDirectionParams {
	readonly basePosition: Position;
	readonly coefficients: Coefficients;
}

const createDirection = (params: CreateDirectionParams): Direction => {
	const { basePosition, coefficients, } = params;
	return {
		getPosition: (offset) => ({
			column: basePosition.column + offset * coefficients.column,
			row: basePosition.row + offset * coefficients.row,
		}),
		findInLine: 0,
	};
};
