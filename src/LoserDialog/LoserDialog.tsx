import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FC, useContext } from 'react';
import { LoserDialogProps } from './types';
import { F, over, pipe } from 'lodash/fp';
import { GAME_OVER_TEXT, GAME_OVER_TITLE, NEW_GAME_TEXT } from './constants';
import { RevealedCellsContextValue } from '../context/types';
import { RevealedCellsContext } from '../context';

export const LoserDialog: FC<LoserDialogProps> = ({ isOpen, setIsOpen, resetGameBoard }) => {
	const { resetRevealedCells } = useContext<RevealedCellsContextValue>(RevealedCellsContext);

	const startNewGame = () => over([pipe(F, setIsOpen), resetGameBoard, resetRevealedCells])();

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
