import { BoardCellState, PropsByDifficulty } from './types';

export const PROPS_BY_DIFFICULTY: PropsByDifficulty = {
	easy: { bombsAmount: 10, columnCellsAmount: 10, rowCellsAmount: 7, cellSize: 50 },
	medium: { bombsAmount: 40, columnCellsAmount: 18, rowCellsAmount: 14, cellSize: 40 },
	hard: { bombsAmount: 99, columnCellsAmount: 24, rowCellsAmount: 20, cellSize: 30 },
};

export const BOMB: number = -1;
export const EMPTY_CELL: number = 0;
export const INITIALIZED_CELL: Omit<BoardCellState, 'row' | 'column'> = {
	isRevealed: false,
	isFlagged: false,
	cellValue: EMPTY_CELL,
};
