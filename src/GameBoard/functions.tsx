import { map, random, times, curry, pipe, reduce, identity, set, isNil } from 'lodash/fp';
import { BOMB, INITIALIZED_CELL, PROPS_BY_DIFFICULTY } from './constants';
import { BoardCellState, Coordinate, DifficultyLevel, GameBoardDifficultyProps } from './types';
import { ReactElement } from 'react';
import { Grid, GridTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { BoardCell, BoardCellProps } from './BoardCell';
import { v4 as uuidv4 } from 'uuid';

export const initializeGameBoard = (difficultyLevel: DifficultyLevel): BoardCellState[][] => {
	const { bombsAmount, rowCellsAmount, columnCellsAmount }: GameBoardDifficultyProps =
		PROPS_BY_DIFFICULTY[difficultyLevel];

	const gameBoard: BoardCellState[][] = createEmptyBoard(rowCellsAmount, columnCellsAmount);

	const boardWithBombs = pipe(
		times<number>(identity),
		reduce<number, BoardCellState[][]>(addBomb(rowCellsAmount, columnCellsAmount), gameBoard)
	)(bombsAmount);

	return boardWithBombs;
};

const createEmptyBoard = (rowCellsAmount: number, columnCellsAmount: number): BoardCellState[][] =>
	times<BoardCellState[]>(
		(row) =>
			times<BoardCellState>((column) => ({ ...INITIALIZED_CELL, row, column }), columnCellsAmount),
		rowCellsAmount
	);

const addBomb = curry(
	(
		rowCellsAmount: number,
		columnCellsAmount: number,
		gameBoard: BoardCellState[][]
	): BoardCellState[][] => {
		const randomFromStart = random(0);
		let row = randomFromStart(rowCellsAmount - 1);
		let col = randomFromStart(columnCellsAmount - 1);

		while (gameBoard[row][col].cellValue === BOMB) {
			row = randomFromStart(rowCellsAmount - 1);
			col = randomFromStart(columnCellsAmount - 1);
		}

		const boardWithBomb = set<BoardCellState[][]>(
			`${row}.${col}`,
			{ ...INITIALIZED_CELL, cellValue: BOMB, row, column: col },
			gameBoard
		);

		return increaseValuesAroundBomb(row, col, boardWithBomb);
	}
);

const increaseValuesAroundBomb = (
	row: number,
	col: number,
	gameBoard: BoardCellState[][]
): BoardCellState[][] =>
	reduce<Coordinate, BoardCellState[][]>(increaseCellValue, gameBoard, [
		{ row: row - 1, col: col - 1 },
		{ row: row - 1, col },
		{ row: row - 1, col: col + 1 },
		{ row, col: col + 1 },
		{ row: row + 1, col: col + 1 },
		{ row: row + 1, col },
		{ row: row + 1, col: col - 1 },
		{ row, col: col - 1 },
	]);

const increaseCellValue = (gameBoard: BoardCellState[][], { row, col }: Coordinate) => {
	if (
		!isNil(gameBoard[row]) &&
		!isNil(gameBoard[row][col]) &&
		gameBoard[row][col].cellValue != BOMB
	) {
		const newCell = { ...gameBoard[row][col], cellValue: gameBoard[row][col].cellValue + 1 };
		const newGameBoard = set(`${row}.${col}`, newCell, gameBoard);

		return newGameBoard;
	}

	return gameBoard;
};

export const renderBoardRow = curry(
	(
		{ rowCellsAmount, cellSize, ...restBoardCellProps }: Omit<BoardCellProps, 'cellState'>,
		rowCellStates: BoardCellState[]
	): ReactElement<OverridableComponent<GridTypeMap>> => {
		return (
			<Grid
				container
				item
				wrap='nowrap'
				width='inherit'
				height={cellSize}
				sx={{ [`@media (max-width: ${cellSize * rowCellsAmount}px)`]: { height: cellSize / 2 } }}
				direction='row'
				key={uuidv4()}
				justifyContent='center'
				alignItems='center'>
				{map(renderBoardCell({ rowCellsAmount, cellSize, ...restBoardCellProps }), rowCellStates)}
			</Grid>
		);
	}
);

const renderBoardCell = curry(
	(
		boardCellProps: Omit<BoardCellProps, 'cellState'>,
		cellState: BoardCellState
	): ReactElement<BoardCellProps> => (
		<BoardCell {...{ cellState }} key={uuidv4()} {...boardCellProps} />
	)
);
