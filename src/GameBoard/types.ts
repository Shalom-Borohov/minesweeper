import { Dispatch, SetStateAction } from 'react';

export interface Coordinate {
	row: number;
	col: number;
}

export interface GameBoardProps {
	gameBoard: number[][];
	setIsLoserDialogOpen: Dispatch<SetStateAction<boolean>>;
}
