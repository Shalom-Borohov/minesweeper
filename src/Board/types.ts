export interface Coordinate {
	row: number;
	col: number;
}

export interface Cell {
	isRevealed: boolean;
	isFlagged: boolean;
	cellValue: number;
	row: number;
	column: number;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface GameDifficultyProps {
	cellsInRow: number;
	cellsInColumn: number;
	bombsAmount: number;
	cellSize: number;
}

export type PropsByDifficulty = Record<DifficultyLevel, GameDifficultyProps>;
