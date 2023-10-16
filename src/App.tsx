import { FC, useState } from 'react';
import { Navbar } from './Navbar';
import { set, add } from 'lodash/fp';
import FlagsCounter from './FlagsCounter';
import { WinnerDialog } from './WinnerDialog';
import { LoserDialog } from './LoserDialog/LoserDialog';
import {
	ensureGameLost,
	ensureGameWon,
	ensureRevealedEmptyCell,
	initializeGameBoard,
	revealBoard,
	revealEmptyCell,
} from './Logic';
import Board from './Board';
import { Cell, DifficultyLevel } from './Board/types';
import { PROPS_BY_DIFFICULTY } from './Board/constants';

export const App: FC = () => {
	const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('easy');
	const [isLoserDialogOpen, setIsLoserDialogOpen] = useState<boolean>(false);
	const [isWinnerDialogOpen, setIsWinnerDialogOpen] = useState<boolean>(false);
	const [gameBoard, setGameBoard] = useState<Cell[][]>(initializeGameBoard(difficultyLevel));
	const { bombsAmount } = PROPS_BY_DIFFICULTY[difficultyLevel];
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

	const resetGameBoard = (newDifficultyLevel: DifficultyLevel = difficultyLevel): void => {
		setGameBoard(initializeGameBoard(newDifficultyLevel));
		setFlagsAmount(PROPS_BY_DIFFICULTY[newDifficultyLevel].bombsAmount);
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
			<WinnerDialog
				isOpen={isWinnerDialogOpen}
				setIsOpen={setIsWinnerDialogOpen}
				{...{ resetGameBoard }}
			/>
			<LoserDialog
				isOpen={isLoserDialogOpen}
				setIsOpen={setIsLoserDialogOpen}
				{...{ resetGameBoard }}
			/>
		</>
	);
};
