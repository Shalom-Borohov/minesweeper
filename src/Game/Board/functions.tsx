import { curry } from 'lodash/fp';
import { Cell } from '../../Types';
import { ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BoardRow, { BoardRowProps } from './BoardRow';

export const renderBoardRow = curry(
	(
		rowCellsDisplayProps: Omit<BoardRowProps, 'rowCellsStates'>,
		rowCellsStates: Cell[]
	): ReactElement<BoardRowProps> => (
		<BoardRow key={uuidv4()} {...{ rowCellsStates }} {...rowCellsDisplayProps} />
	)
);
