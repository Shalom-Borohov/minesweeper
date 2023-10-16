import { curry } from 'lodash/fp';
import BoardCell, { BoardCellProps } from './BoardCell';
import { ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Cell } from '../../Types';

export const renderBoardCell = curry(
	(boardCellProps: Omit<BoardCellProps, 'cell'>, cell: Cell): ReactElement<BoardCellProps> => (
		<BoardCell {...{ cell: cell }} key={uuidv4()} {...boardCellProps} />
	)
);
