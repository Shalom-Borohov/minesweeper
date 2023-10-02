import { FC, useState } from 'react';
import { Navbar } from './Navbar';
import { GameBoard, initializeGameBoard } from './GameBoard';
import { pipe } from 'lodash/fp';
import { LoserDialog } from './LoserDialog';
import { FlagsAmountIndicator } from './FlagsAmountIndicator';
import { RevealedCellsProvider } from './context/RevealedCellsContext';
import { WinnerDialog } from './WinnerDialog';
import { DifficultyLevel } from './GameBoard/types';

export const App: FC = () => {
	const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('easy');
	const [gameBoard, setGameBoard] = useState<number[][]>(initializeGameBoard(difficultyLevel));
	const [isLoserDialogOpen, setIsLoserDialogOpen] = useState<boolean>(false);
	const [isWinnerDialogOpen, setIsWinnerDialogOpen] = useState<boolean>(false);

	const resetGameBoard = (newDifficultyLevel: DifficultyLevel = difficultyLevel): void =>
		pipe(initializeGameBoard, setGameBoard)(newDifficultyLevel);

	return (
		<RevealedCellsProvider>
			<Navbar {...{ resetGameBoard, setDifficultyLevel, difficultyLevel }} />
			<FlagsAmountIndicator {...{ difficultyLevel }} />
			<GameBoard {...{ difficultyLevel, gameBoard, setIsLoserDialogOpen, setIsWinnerDialogOpen }} />
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
		</RevealedCellsProvider>
	);
};
