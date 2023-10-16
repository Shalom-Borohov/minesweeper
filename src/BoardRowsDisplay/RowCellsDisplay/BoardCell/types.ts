import { Cell, GameDifficultyProps } from '../../types';

export interface BoardCellProps extends Pick<GameDifficultyProps, 'cellsInColumn' | 'cellSize'> {
	cellState: Cell;
	updateGameBoard: (row: number, column: number, cellState: Cell) => void;
}
