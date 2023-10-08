import { BoardCellState, GameDifficultyProps } from '../types';

export interface RowCellsDisplayProps
	extends Pick<GameDifficultyProps, 'cellsInColumn' | 'cellSize'> {
	rowCellsStates: BoardCellState[];
	updateGameBoard: (row: number, column: number, cellState: BoardCellState) => void;
}
