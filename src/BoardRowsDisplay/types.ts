import { Dispatch, SetStateAction } from 'react';

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

export interface BoardRowsDisplayProps {
	gameBoard: Cell[][];
	setIsLoserDialogOpen: Dispatch<SetStateAction<boolean>>;
	setIsWinnerDialogOpen: Dispatch<SetStateAction<boolean>>;
	difficultyLevel: DifficultyLevel;
	updateGameBoard: (row: number, column: number, cellState: Cell) => void;
}

export interface GameDifficultyProps {
	cellsInRow: number;
	cellsInColumn: number;
	bombsAmount: number;
	cellSize: number;
}

export type PropsByDifficulty = Record<DifficultyLevel, GameDifficultyProps>;
