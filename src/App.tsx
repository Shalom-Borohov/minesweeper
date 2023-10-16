import { Dispatch, FC, SetStateAction, useState } from 'react';
import Navbar from './Navbar';
import { set, add } from 'lodash/fp';
import FlagsCounter from './FlagsCounter';
import {
	ensureGameLost,
	ensureGameWon,
	ensureRevealedEmptyCell,
	initializeGameBoard,
	revealBoard,
	revealEmptyCell,
} from './Logic';
import Board from './Board';
import { settingsByDifficulty } from './Board/constants';
import Dialog from './Dialog';
import {
	gameOverContent,
	gameOverTitle,
	gameWonTitle,
	newGameExclamationText,
	newGameQuestionText,
} from './constants';
import { Cell } from './Types/Cell';
import { DifficultyLevel } from './Types/DifficultyLevel';

export const App: FC = () => {
	const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('easy');
	const [isLoserDialogOpen, setIsLoserDialogOpen] = useState<boolean>(false);
	const [isWinnerDialogOpen, setIsWinnerDialogOpen] = useState<boolean>(false);
	const [gameBoard, setGameBoard] = useState<Cell[][]>(initializeGameBoard(difficultyLevel));
	const { bombsAmount } = settingsByDifficulty[difficultyLevel];
	const [flagsAmount, setFlagsAmount] = useState<number>(bombsAmount);

	const updateGameBoard = (row: number, column: number, cellState: Cell): void => {
		const { cellValue, isRevealed, isFlagged }: Cell = cellState;

		let newGameBoard: Cell[][] = set(`${row}.${column}`, cellState, gameBoard);

		if (ensureGameLost(cellValue, isRevealed)) {
			newGameBoard = revealBoard(gameBoard);
			setIsLoserDialogOpen(true);
		} else if (ensureRevealedEmptyCell(cellValue, isRevealed)) {
			newGameBoard = revealEmptyCell({ row, col: column }, gameBoard);
		} else if ((!isFlagged || flagsAmount != 0) && !isRevealed) {
			isFlagged ? setFlagsAmount(add(-1)) : setFlagsAmount(add(1));
		}

		if (ensureGameWon(newGameBoard, bombsAmount)) {
			setIsWinnerDialogOpen(true);
		}

		setGameBoard(newGameBoard);
	};

	const resetGameBoard = (newDifficultyLevel: DifficultyLevel): void => {
		setGameBoard(initializeGameBoard(newDifficultyLevel));
		setFlagsAmount(settingsByDifficulty[newDifficultyLevel].bombsAmount);
	};

	const closeDialog = (setIsOpen: Dispatch<SetStateAction<boolean>>) => (): void => {
		setIsOpen(false);
		resetGameBoard(difficultyLevel);
	};

	return (
		<>
			<Navbar {...{ resetGameBoard, setDifficultyLevel, difficultyLevel }} />
			<FlagsCounter {...{ difficultyLevel, flagsAmount }} />
			<Board
				{...{
					difficultyLevel,
					gameBoard,
					setIsLoserDialogOpen,
					setIsWinnerDialogOpen,
					updateGameBoard,
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
