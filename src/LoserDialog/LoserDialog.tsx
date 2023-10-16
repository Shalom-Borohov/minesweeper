import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';
import { F, over, pipe } from 'lodash/fp';
import { GAME_OVER_TEXT, GAME_OVER_TITLE, NEW_GAME_TEXT } from './constants';
import { DifficultyLevel } from '../Board/types';

export interface LoserDialogProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	resetGameBoard: (difficultyLevel?: DifficultyLevel) => void;
}

export const LoserDialog: FC<LoserDialogProps> = ({ isOpen, setIsOpen, resetGameBoard }) => {
	const startNewGame = (): void[] => over<void>([pipe(F, setIsOpen), resetGameBoard])();

	return (
		<Dialog open={isOpen}>
			<DialogTitle textAlign='center'>{GAME_OVER_TITLE}</DialogTitle>
			<DialogContent>{GAME_OVER_TEXT}</DialogContent>
			<DialogActions>
				<Button variant='outlined' autoFocus onClick={startNewGame}>
					{NEW_GAME_TEXT}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
