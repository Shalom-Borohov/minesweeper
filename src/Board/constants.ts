import { Cell } from '../Types/Cell';
import { SettingsByDifficulty } from '../Types/SettingsByDifficulty';

export const settingsByDifficulty: SettingsByDifficulty = {
	easy: { bombsAmount: 10, cellsInRow: 10, cellsInColumn: 7, cellSize: 50 },
	medium: { bombsAmount: 40, cellsInRow: 18, cellsInColumn: 14, cellSize: 40 },
	hard: { bombsAmount: 99, cellsInRow: 24, cellsInColumn: 20, cellSize: 30 },
};

export const bomb: number = -1;
export const emptyCell: number = 0;
export const initializedCell: Omit<Cell, 'row' | 'column'> = {
	isRevealed: false,
	isFlagged: false,
	cellValue: emptyCell,
};
