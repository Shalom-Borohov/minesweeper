import { curry } from 'lodash/fp';
import { BoardCell, BoardCellProps } from './BoardCell';
import { BoardCellState } from '..';
import { ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const renderBoardCell = curry(
	(
		boardCellProps: Omit<BoardCellProps, 'cellState'>,
		cellState: BoardCellState
	): ReactElement<BoardCellProps> => (
		<BoardCell {...{ cellState }} key={uuidv4()} {...boardCellProps} />
	)
);
