import { Dispatch, SetStateAction } from 'react';
import { DifficultyLevel } from '../GameBoard/types';

export interface NavbarProps {
	resetGameBoard: (difficultyLevel?: DifficultyLevel) => void;
	setDifficultyLevel: Dispatch<SetStateAction<DifficultyLevel>>;
	difficultyLevel: DifficultyLevel;
}
