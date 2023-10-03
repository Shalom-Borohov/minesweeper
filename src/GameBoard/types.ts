import { Dispatch, SetStateAction } from 'react';

export interface Coordinate {
	row: number;
	col: number;
}

export interface GameBoardProps {
	gameBoard: BoardCellState[][];
	setIsLoserDialogOpen: Dispatch<SetStateAction<boolean>>;
	setIsWinnerDialogOpen: Dispatch<SetStateAction<boolean>>;
	difficultyLevel: DifficultyLevel;
	updateGameBoard: (row: number, column: number, cellState: BoardCellState) => void;
}

export interface GameBoardDifficultyProps {
	columnCellsAmount: number;
	rowCellsAmount: number;
	bombsAmount: number;
	cellSize: number;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type PropsByDifficulty = Record<DifficultyLevel, GameBoardDifficultyProps>;
export interface BoardCellState {
	isRevealed: boolean;
	isFlagged: boolean;
	cellValue: number;
	row: number;
	column: number;
}
