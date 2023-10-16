import { Grid } from '@mui/material';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'lodash/fp';
import { renderBoardCell } from './functions';
import { Cell, GameDifficultyProps } from '../types';

export interface BoardRowProps extends Pick<GameDifficultyProps, 'cellsInColumn' | 'cellSize'> {
	rowCellsStates: Cell[];
	updateGameBoard: (row: number, column: number, cellState: Cell) => void;
}

const BoardRow: FC<BoardRowProps> = ({
	cellSize,
	cellsInColumn,
	rowCellsStates,
	...restBoardCellProps
}) => (
	<Grid
		container
		item
		wrap='nowrap'
		width='inherit'
		height={cellSize}
		sx={{ [`@media (max-width: ${cellSize * cellsInColumn}px)`]: { height: cellSize / 2 } }}
		direction='row'
		key={uuidv4()}
		justifyContent='center'
		alignItems='center'>
		{map(renderBoardCell({ cellsInColumn, cellSize, ...restBoardCellProps }), rowCellsStates)}
	</Grid>
);

export default BoardRow;
