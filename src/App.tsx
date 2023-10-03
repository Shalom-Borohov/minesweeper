import { FC, useState } from 'react';
import { Navbar } from './Navbar';
import { GameBoard, initializeGameBoard } from './GameBoard';
import { pipe, set, map, flatten, prop, reject, propEq } from 'lodash/fp';
import { LoserDialog } from './LoserDialog';
import { FlagsAmountIndicator } from './FlagsAmountIndicator';
import { WinnerDialog } from './WinnerDialog';
import { BoardCellState, DifficultyLevel } from './GameBoard/types';
import { BOMB, PROPS_BY_DIFFICULTY } from './GameBoard/constants';

export const App: FC = () => {
	const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('easy');
	const [isLoserDialogOpen, setIsLoserDialogOpen] = useState<boolean>(false);
	const [isWinnerDialogOpen, setIsWinnerDialogOpen] = useState<boolean>(false);
	const [gameBoard, setGameBoard] = useState<BoardCellState[][]>(
		initializeGameBoard(difficultyLevel)
	);

	const { bombsAmount } = PROPS_BY_DIFFICULTY[difficultyLevel];

	const updateGameBoard = (row: number, column: number, cellState: BoardCellState): void => {
		if (cellState.cellValue === BOMB && cellState.isRevealed) {
			revealBoard();
			setIsLoserDialogOpen(true);
		} else if (checkIsWon()) {
			revealBoard();
			setIsWinnerDialogOpen(true);
		} else {
			setGameBoard(set(`${row}.${column}`, cellState));
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

	const resetGameBoard = (newDifficultyLevel: DifficultyLevel = difficultyLevel): void =>
		pipe(initializeGameBoard, setGameBoard)(newDifficultyLevel);

	return (
		<>
			<Navbar {...{ resetGameBoard, setDifficultyLevel, difficultyLevel }} />
			<FlagsAmountIndicator {...{ difficultyLevel }} />
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
