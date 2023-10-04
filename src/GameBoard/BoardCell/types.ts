import { BoardCellState, GameBoardDifficultyProps } from '../types';

export interface BoardCellProps
	extends Pick<GameBoardDifficultyProps, 'cellsInColumn' | 'cellSize'> {
	cellState: BoardCellState;
	updateGameBoard: (row: number, column: number, cellState: BoardCellState) => void;
}
