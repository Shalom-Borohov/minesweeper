import { Cell, GameDifficultyProps } from '../types';

export interface RowCellsDisplayProps
	extends Pick<GameDifficultyProps, 'cellsInColumn' | 'cellSize'> {
	rowCellsStates: Cell[];
	updateGameBoard: (row: number, column: number, cellState: Cell) => void;
}
