import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';
import { F, over, pipe } from 'lodash/fp';
import { GAME_WON_TITLE, NEW_GAME_TEXT } from './constants';
import { DifficultyLevel } from '../Board/types';

export interface WinnerDialogProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	resetGameBoard: (difficultyLevel?: DifficultyLevel) => void;
}

export const WinnerDialog: FC<WinnerDialogProps> = ({ isOpen, setIsOpen, resetGameBoard }) => {
	const startNewGame = (): void[] => over<void>([pipe(F, setIsOpen), resetGameBoard])();

	return (
		<Dialog open={isOpen}>
			<DialogTitle textAlign='center'>{GAME_WON_TITLE}</DialogTitle>
			<DialogActions>
				<Button autoFocus variant='outlined' onClick={startNewGame}>
					{NEW_GAME_TEXT}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
