import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { FC, useContext } from 'react';
import { F, over, pipe } from 'lodash/fp';
import { GAME_WON_TITLE, NEW_GAME_TEXT } from './constants';
import { WinnerDialogProps } from './types';
import { RevealedCellsContextValue } from '../context/types';
import { RevealedCellsContext } from '../context';

export const WinnerDialog: FC<WinnerDialogProps> = ({ isOpen, setIsOpen, resetGameBoard }) => {
	const { resetRevealedCells } = useContext<RevealedCellsContextValue>(RevealedCellsContext);

	const startNewGame = () => over([pipe(F, setIsOpen), resetGameBoard, resetRevealedCells])();

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
