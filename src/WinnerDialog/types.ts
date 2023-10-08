import { Dispatch, SetStateAction } from 'react';
import { DifficultyLevel } from '../BoardRowsDisplay/types';

export interface WinnerDialogProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	resetGameBoard: (difficultyLevel?: DifficultyLevel) => void;
}
