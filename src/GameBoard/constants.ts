import { PropsByDifficulty } from './types';

export const PROPS_BY_DIFFICULTY: PropsByDifficulty = {
	easy: { bombsAmount: 10, columnCellsAmount: 7, rowCellsAmount: 10, cellSize: 50 },
	medium: { bombsAmount: 40, columnCellsAmount: 14, rowCellsAmount: 18, cellSize: 40 },
	hard: { bombsAmount: 99, columnCellsAmount: 20, rowCellsAmount: 24, cellSize: 30 },
};

export const EMPTY_CELL: number = 0;
export const BOMB: number = -1;
