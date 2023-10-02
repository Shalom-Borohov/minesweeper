import { Dispatch, SetStateAction } from 'react';

export interface Coordinate {
	row: number;
	col: number;
}

export interface GameBoardProps {
	gameBoard: number[][];
	setIsLoserDialogOpen: Dispatch<SetStateAction<boolean>>;
	setIsWinnerDialogOpen: Dispatch<SetStateAction<boolean>>;
	difficultyLevel: DifficultyLevel;
}

export interface GameBoardDifficultyProps {
	columnCellsAmount: number;
	rowCellsAmount: number;
	bombsAmount: number;
	cellSize: number;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type PropsByDifficulty = Record<DifficultyLevel, GameBoardDifficultyProps>;
