import { Dispatch, SetStateAction } from 'react';
import { DifficultyLevel } from '../GameBoard/types';

export interface LoserDialogProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	resetGameBoard: (difficultyLevel: DifficultyLevel) => void;
}
