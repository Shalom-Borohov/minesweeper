import { curry } from 'lodash/fp';
import { BoardCell, BoardCellProps } from './BoardCell';
import { ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Cell } from '../types';

export const renderBoardCell = curry(
	(
		boardCellProps: Omit<BoardCellProps, 'cellState'>,
		cellState: Cell
	): ReactElement<BoardCellProps> => (
		<BoardCell {...{ cellState }} key={uuidv4()} {...boardCellProps} />
	)
);
