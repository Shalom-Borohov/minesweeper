import {
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react';
import { Cell, DifficultyLevel } from '../Types';
import { initializeGameBoard } from '../Logic';
import { settingsByDifficulty } from '../Game/constants';

interface GameContextProps {
	difficultyLevel: DifficultyLevel;
	setDifficultyLevel: Dispatch<SetStateAction<DifficultyLevel>>;
	gameBoard: Cell[][];
	setGameBoard: Dispatch<SetStateAction<Cell[][]>>;
	bombsAmount: number;
	resetGameBoard: (difficultyLevel: DifficultyLevel) => void;
	flagsAmount: number;
	setFlagsAmount: Dispatch<SetStateAction<number>>;
	startNewGame: () => void;
	cellsInRow: number;
	cellsInColumn: number;
	cellSize: number;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: FC<PropsWithChildren> = ({ children }) => {
	const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('easy');
	const [gameBoard, setGameBoard] = useState<Cell[][]>(initializeGameBoard(difficultyLevel));

	const { cellsInColumn, cellsInRow, cellSize, bombsAmount } =
		settingsByDifficulty[difficultyLevel];

	const [flagsAmount, setFlagsAmount] = useState<number>(bombsAmount);

	const startNewGame = (): void => resetGameBoard(difficultyLevel);

	const resetGameBoard = (newDifficultyLevel: DifficultyLevel): void => {
		setGameBoard(initializeGameBoard(newDifficultyLevel));
		setFlagsAmount(settingsByDifficulty[newDifficultyLevel].bombsAmount);
	};

	const value = {
		gameBoard,
		setGameBoard,
		bombsAmount,
		resetGameBoard,
		flagsAmount,
		setFlagsAmount,
		difficultyLevel,
		setDifficultyLevel,
		startNewGame,
		cellsInRow,
		cellsInColumn,
		cellSize,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
	const context = useContext(GameContext);

	if (context === undefined) {
		throw new Error('UseGame must be used within a GameProvider');
	}

	return context;
};
