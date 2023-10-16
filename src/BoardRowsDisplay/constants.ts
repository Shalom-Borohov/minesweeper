import { Cell, PropsByDifficulty } from './types';

export const PROPS_BY_DIFFICULTY: PropsByDifficulty = {
	easy: { bombsAmount: 10, cellsInRow: 10, cellsInColumn: 7, cellSize: 50 },
	medium: { bombsAmount: 40, cellsInRow: 18, cellsInColumn: 14, cellSize: 40 },
	hard: { bombsAmount: 99, cellsInRow: 24, cellsInColumn: 20, cellSize: 30 },
};

export const BOMB: number = -1;
export const EMPTY_CELL: number = 0;
export const INITIALIZED_CELL: Omit<Cell, 'row' | 'column'> = {
	isRevealed: false,
	isFlagged: false,
	cellValue: EMPTY_CELL,
};
