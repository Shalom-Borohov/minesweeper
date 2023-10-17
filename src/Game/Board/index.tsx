import { Grid } from '@mui/material';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { add, map, set } from 'lodash/fp';
import { renderBoardRow } from './functions';
import { Cell } from '../../Types';
import { useGame } from '../../GameProvider';
import { bomb, emptyCell } from '../constants';
import { ensureGameWon, revealBoard, revealEmptyCell } from '../../Logic';
import Dialog from '../Dialog';
import {
	gameOverContent,
	gameOverTitle,
	gameWonTitle,
	newGameExclamationText,
	newGameQuestionText,
} from '../../constants';

const Board: FC = () => {
	const [isLoserDialogOpen, setIsLoserDialogOpen] = useState<boolean>(false);
	const [isWinnerDialogOpen, setIsWinnerDialogOpen] = useState<boolean>(false);
	const { gameBoard, flagsAmount, setFlagsAmount, setGameBoard, bombsAmount, startNewGame } =
		useGame();

	const closeDialog = (setIsOpen: Dispatch<SetStateAction<boolean>>) => (): void => {
		setIsOpen(false);
		startNewGame();
	};

	const toggleFlags = (cell: Cell): void => {
		const { isFlagged, row, col, isRevealed }: Cell = cell;

		if ((!isFlagged || flagsAmount != 0) && !isRevealed) {
			isFlagged ? setFlagsAmount(add(-1)) : setFlagsAmount(add(1));
			setGameBoard(set(`${row}.${col}`, cell));
		}
	};

	const revealCells = (cell: Cell): void => {
		const { cellValue, isRevealed, row, col }: Cell = cell;

		let newGameBoard: Cell[][] = set(`${row}.${col}`, cell, gameBoard);

		if (!isRevealed) {
			return;
		}

		if (cellValue === bomb) {
			newGameBoard = revealBoard(gameBoard);
			setIsLoserDialogOpen(true);
		} else if (cellValue === emptyCell) {
			newGameBoard = revealEmptyCell({ row, col }, gameBoard);
		}

		if (ensureGameWon(newGameBoard, bombsAmount)) {
			setIsWinnerDialogOpen(true);
		}

		setGameBoard(newGameBoard);
	};

	return (
		<>
			<Grid container direction='row'>
				{map(renderBoardRow({ toggleFlags, revealCells }), gameBoard)}
			</Grid>
			<Dialog
				isOpen={isWinnerDialogOpen}
				close={closeDialog(setIsWinnerDialogOpen)}
				closeButtonText={newGameExclamationText}
				title={gameWonTitle}
			/>
			<Dialog
				isOpen={isLoserDialogOpen}
				close={closeDialog(setIsLoserDialogOpen)}
				content={gameOverContent}
				closeButtonText={newGameQuestionText}
				title={gameOverTitle}
			/>
		</>
	);
};

export default Board;
