import { Dispatch, FC, SetStateAction, useState } from 'react';
import FlagsCounter from './FlagsCounter';
import Board from './Board';
import Dialog from './Dialog';
import { Cell, DifficultyLevel } from '../Types';
import { set, add } from 'lodash/fp';
import { bomb, emptyCell } from './constants';
import { ensureGameWon, revealBoard, revealEmptyCell } from './Logic';
import {
	gameOverContent,
	gameOverTitle,
	gameWonTitle,
	newGameExclamationText,
	newGameQuestionText,
} from '../constants';

export interface GameProps {
	resetGameBoard: (difficultyLevel: DifficultyLevel) => void;
	gameBoard: Cell[][];
	flagsAmount: number;
	setGameBoard: Dispatch<SetStateAction<Cell[][]>>;
	setFlagsAmount: Dispatch<SetStateAction<number>>;
	difficultyLevel: DifficultyLevel;
	bombsAmount: number;
}

const Game: FC<GameProps> = ({
	resetGameBoard,
	difficultyLevel,
	setFlagsAmount,
	flagsAmount,
	gameBoard,
	setGameBoard,
	bombsAmount,
}) => {
	const [isLoserDialogOpen, setIsLoserDialogOpen] = useState<boolean>(false);
	const [isWinnerDialogOpen, setIsWinnerDialogOpen] = useState<boolean>(false);

	const closeDialog = (setIsOpen: Dispatch<SetStateAction<boolean>>) => (): void => {
		setIsOpen(false);
		resetGameBoard(difficultyLevel);
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
			<FlagsCounter {...{ difficultyLevel, flagsAmount }} />
			<Board
				{...{
					difficultyLevel,
					gameBoard,
					setIsLoserDialogOpen,
					setIsWinnerDialogOpen,
					revealCells,
					toggleFlags,
				}}
			/>
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

export default Game;
