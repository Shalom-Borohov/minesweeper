import { Dispatch, SetStateAction } from 'react';
import { DifficultyLevel } from '../BoardRowsDisplay/types';

export interface NavbarProps {
	resetGameBoard: (difficultyLevel?: DifficultyLevel) => void;
	setDifficultyLevel: Dispatch<SetStateAction<DifficultyLevel>>;
	difficultyLevel: DifficultyLevel;
}
