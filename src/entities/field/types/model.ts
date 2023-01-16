export type Row = Array<number | null>;

export interface GenerateRowsParams {
	readonly size: number;
}

export interface CellState {
	readonly badge: number | null;
	readonly isFilled: boolean;
	readonly position: Position;
}

export interface ClickCellParams {
	readonly badge: number;
	readonly position: Position;
}

export interface Position {
	readonly row: number;
	readonly column: number;
}
