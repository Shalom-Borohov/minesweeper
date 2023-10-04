import { FC, useState } from 'react';
import { Navbar } from './Navbar';
import { GameBoard, initializeGameBoard } from './GameBoard';
import { pipe, set, map, flatten, prop, reject, propEq, add } from 'lodash/fp';
import { LoserDialog } from './LoserDialog';
import { FlagsAmountIndicator } from './FlagsAmountIndicator';
import { WinnerDialog } from './WinnerDialog';
import { BoardCellState, DifficultyLevel } from './GameBoard/types';
import { BOMB, EMPTY_CELL, PROPS_BY_DIFFICULTY } from './GameBoard/constants';
import { revealZeroCluster } from './GameBoard/functions';

export const App: FC = () => {
	const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('easy');
	const [isLoserDialogOpen, setIsLoserDialogOpen] = useState<boolean>(false);
	const [isWinnerDialogOpen, setIsWinnerDialogOpen] = useState<boolean>(false);
	const [gameBoard, setGameBoard] = useState<BoardCellState[][]>(
		initializeGameBoard(difficultyLevel)
	);

	const { bombsAmount } = PROPS_BY_DIFFICULTY[difficultyLevel];
	const [flagsAmount, setFlagsAmount] = useState<number>(bombsAmount);

	const updateGameBoard = (row: number, column: number, cellState: BoardCellState): void => {
		const { cellValue, isRevealed, isFlagged } = cellState;

		if (cellValue === BOMB && isRevealed) {
			revealBoard();
			setIsLoserDialogOpen(true);
		} else if (cellValue === EMPTY_CELL && isRevealed) {
			setGameBoard(revealZeroCluster({ row, col: column }));
		} else if (!isFlagged || flagsAmount != 0) {
			if (isFlagged) {
				setFlagsAmount(add(-1));
			} else if (!isFlagged && !isRevealed) {
				setFlagsAmount(add(1));
			}

			setGameBoard(set(`${row}.${column}`, cellState));
		}

		if (checkIsWon()) {
			revealBoard();
			setIsWinnerDialogOpen(true);
		}
	};

	const checkIsWon = () =>
		pipe(
			flatten,
			reject<BoardCellState>(prop('isRevealed')),
			propEq('length', bombsAmount)
		)(gameBoard);

	const revealBoard = () =>
		setGameBoard(
			map<BoardCellState[], BoardCellState[]>(
				map<BoardCellState, BoardCellState>(pipe(set('isRevealed', true), set('isFlagged', false)))
			)
		);

	const resetGameBoard = (newDifficultyLevel: DifficultyLevel = difficultyLevel): void => {
		setGameBoard(initializeGameBoard(newDifficultyLevel));
		setFlagsAmount(bombsAmount);
	};

	return (
		<>
			<Navbar {...{ resetGameBoard, setDifficultyLevel, difficultyLevel }} />
			<FlagsAmountIndicator {...{ difficultyLevel, flagsAmount }} />
			<GameBoard
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
