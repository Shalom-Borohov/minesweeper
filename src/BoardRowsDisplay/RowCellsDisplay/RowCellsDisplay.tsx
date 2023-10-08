import { Grid } from '@mui/material';
import { FC } from 'react';
import { RowCellsDisplayProps } from './types';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'lodash/fp';
import { renderBoardCell } from './functions';

export const RowCellsDisplay: FC<RowCellsDisplayProps> = ({
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
