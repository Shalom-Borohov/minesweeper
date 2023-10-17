import { Grid } from '@mui/material';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'lodash/fp';
import { renderBoardCell } from './functions';
import { Cell } from '../../../Types';
import { useGame } from '../../../GameProvider';

export interface BoardRowProps {
	rowCellsStates: Cell[];
	revealCells: (cell: Cell) => void;
	toggleFlags: (cell: Cell) => void;
}

const BoardRow: FC<BoardRowProps> = ({ rowCellsStates, ...restBoardCellProps }) => {
	const { cellSize, cellsInColumn } = useGame();

	return (
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
			{map(renderBoardCell(restBoardCellProps), rowCellsStates)}
		</Grid>
	);
};

export default BoardRow;
