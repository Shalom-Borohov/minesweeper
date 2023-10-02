import { Dispatch, SetStateAction } from 'react';
import { GameBoardDifficultyProps } from '../types';

export interface BoardCellProps extends GameBoardDifficultyProps {
	cellValue: number;
	setIsLoserDialogOpen: Dispatch<SetStateAction<boolean>>;
	setIsWinnerDialogOpen: Dispatch<SetStateAction<boolean>>;
}
