import { BoardCellState, GameDifficultyProps } from '../../types';

export interface BoardCellProps extends Pick<GameDifficultyProps, 'cellsInColumn' | 'cellSize'> {
	cellState: BoardCellState;
	updateGameBoard: (row: number, column: number, cellState: BoardCellState) => void;
}
