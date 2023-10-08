import { curry, flatten, map, pipe, prop, propEq, reject, set } from 'lodash/fp';
import { BoardCellState } from './types';
import { ReactElement } from 'react';
import { RowCellsDisplay } from './RowCellsDisplay/RowCellsDisplay';
import { RowCellsDisplayProps } from './RowCellsDisplay/types';
import { v4 as uuidv4 } from 'uuid';
import { BOMB, EMPTY_CELL } from './constants';

export const renderBoardRow = curry(
	(
		rowCellsDisplayProps: Omit<RowCellsDisplayProps, 'rowCellsStates'>,
		rowCellsStates: BoardCellState[]
	): ReactElement<RowCellsDisplayProps> => (
		<RowCellsDisplay key={uuidv4()} {...{ rowCellsStates }} {...rowCellsDisplayProps} />
	)
);

export const revealBoard = map<BoardCellState[], BoardCellState[]>(
	map<BoardCellState, BoardCellState>(pipe(set('isRevealed', true), set('isFlagged', false)))
);

export const ensureGameLost = (cellValue: number, isRevealed: boolean): boolean =>
	cellValue === BOMB && isRevealed;

export const ensureRevealedEmptyCell = (cellValue: number, isRevealed: boolean): boolean =>
	cellValue === EMPTY_CELL && isRevealed;

export const ensureGameWon = (gameBoard: BoardCellState[][], bombsAmount: number): boolean =>
	pipe(
		flatten<BoardCellState>,
		reject<BoardCellState>(prop<BoardCellState, 'isRevealed'>('isRevealed')),
		propEq<number>('length', bombsAmount)
	)(gameBoard);
