import { FC, useState } from 'react';
import Navbar from './Navbar';
import { initializeGameBoard } from './Game/Logic';
import { Cell } from './Types/Cell';
import { DifficultyLevel } from './Types/DifficultyLevel';
import Game from './Game';
import { settingsByDifficulty } from './Game/constants';

export const App: FC = () => {
	const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('easy');

	const [gameBoard, setGameBoard] = useState<Cell[][]>(initializeGameBoard(difficultyLevel));
	const { bombsAmount } = settingsByDifficulty[difficultyLevel];
	const [flagsAmount, setFlagsAmount] = useState<number>(bombsAmount);

	const resetGameBoard = (newDifficultyLevel: DifficultyLevel): void => {
		setGameBoard(initializeGameBoard(newDifficultyLevel));
		setFlagsAmount(settingsByDifficulty[newDifficultyLevel].bombsAmount);
	};

	return (
		<>
			<Navbar {...{ resetGameBoard, setDifficultyLevel, difficultyLevel }} />
			<Game
				{...{
					resetGameBoard,
					gameBoard,
					flagsAmount,
					setGameBoard,
					setFlagsAmount,
					difficultyLevel,
					bombsAmount,
				}}
			/>
		</>
	);
};
