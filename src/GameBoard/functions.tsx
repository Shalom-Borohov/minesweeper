import {
	map,
	random,
	times,
	curry,
	pipe,
	reduce,
	identity,
	set,
	isNil,
	clone,
	isEqual,
} from 'lodash/fp';
import { BOMB, EMPTY_CELL, INITIALIZED_CELL, PROPS_BY_DIFFICULTY } from './constants';
import { BoardCellState, Coordinate, DifficultyLevel, GameBoardDifficultyProps } from './types';
import { ReactElement } from 'react';
import { Grid, GridTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { BoardCell, BoardCellProps } from './BoardCell';
import { v4 as uuidv4 } from 'uuid';

export const initializeGameBoard = (difficultyLevel: DifficultyLevel): BoardCellState[][] => {
	const { bombsAmount, cellsInColumn, cellsInRow }: GameBoardDifficultyProps =
		PROPS_BY_DIFFICULTY[difficultyLevel];

	const gameBoard: BoardCellState[][] = createEmptyBoard(cellsInColumn, cellsInRow);

	const boardWithBombs = pipe(
		times<number>(identity),
		reduce<number, BoardCellState[][]>(addBomb(cellsInColumn, cellsInRow), gameBoard)
	)(bombsAmount);

	return boardWithBombs;
};

const createEmptyBoard = (cellsInColumn: number, cellsInRow: number): BoardCellState[][] =>
	times<BoardCellState[]>(
		(row) => times<BoardCellState>((column) => ({ ...INITIALIZED_CELL, row, column }), cellsInRow),
		cellsInColumn
	);

const addBomb = curry(
	(
		cellsInColumn: number,
		cellsInRow: number,
		gameBoard: BoardCellState[][]
	): BoardCellState[][] => {
		const randomFromStart = random(0);
		let row = randomFromStart(cellsInColumn - 1);
		let col = randomFromStart(cellsInRow - 1);

		while (gameBoard[row][col].cellValue === BOMB) {
			row = randomFromStart(cellsInColumn - 1);
			col = randomFromStart(cellsInRow - 1);
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
	reduce<Coordinate, BoardCellState[][]>(
		increaseCellValue,
		gameBoard,
		getCoordinatesAroundCell({ row, col })
	);

const increaseCellValue = (gameBoard: BoardCellState[][], { row, col }: Coordinate) => {
	if (
		!isNil(gameBoard[row]) &&
		!isNil(gameBoard[row][col]) &&
		gameBoard[row][col].cellValue != BOMB
	) {
		const cell = gameBoard[row][col];
		const newCell = set<BoardCellState>('cellValue', cell.cellValue + 1, cell);
		const newGameBoard = set<BoardCellState[][]>(`${row}.${col}`, newCell, gameBoard);

		return newGameBoard;
	}

	return gameBoard;
};

export const getCoordinatesAroundCell = ({ row, col }: Coordinate): Coordinate[] => [
	{ row: row - 1, col: col - 1 },
	{ row: row - 1, col },
	{ row: row - 1, col: col + 1 },
	{ row, col: col + 1 },
	{ row: row + 1, col: col + 1 },
	{ row: row + 1, col },
	{ row: row + 1, col: col - 1 },
	{ row, col: col - 1 },
];

export const revealBoardAroundCoordinate = curry(
	({ row, col }: Coordinate, gameBoard: BoardCellState[][]): BoardCellState[][] => {
		const coordinates: Coordinate[] = getCoordinatesAroundCell({ row, col });

		return reduce<Coordinate, BoardCellState[][]>(
			(prevBoard, { row, col }) => {
				if (isNil(prevBoard[row]) || isNil(prevBoard[row][col])) {
					return prevBoard;
				}

				const cell: BoardCellState = set<BoardCellState>('isRevealed', true, prevBoard[row][col]);

				return set<BoardCellState[][]>(`${row}.${col}`, cell, prevBoard);
			},
			gameBoard,
			coordinates
		);
	}
);

export const revealEmptyCluster = curry(
	({ row, col }: Coordinate, gameBoard: BoardCellState[][]): BoardCellState[][] => {
		let location: Coordinate = { row: -1, col: -1 };
		let newLocation: Coordinate = { row, col };
		let newBoard: BoardCellState[][] = clone(gameBoard);
		const locationsLeftToReveal: Coordinate[] = [];

		while (!isEqual(location, newLocation)) {
			location = { ...newLocation };
			const { row: newRow, col: newCol } = newLocation;
			const cell: BoardCellState = set<BoardCellState>(
				'isRevealed',
				true,
				newBoard[newRow][newCol]
			);

			newBoard = set<BoardCellState[][]>(`${newRow}.${newCol}`, cell, newBoard);
			const coordinates: Coordinate[] = getCoordinatesAroundCell(newLocation);

			for (const coordinate of coordinates) {
				if (ensureUnrevealedNotEmptyCell(newBoard, coordinate)) {
					const cell: BoardCellState = set<BoardCellState>(
						'isRevealed',
						true,
						newBoard[coordinate.row][coordinate.col]
					);

					newBoard = set<BoardCellState[][]>(`${coordinate.row}.${coordinate.col}`, cell, newBoard);
				}
			}

			for (const coordinate of coordinates) {
				if (ensureUnrevealedEmptyCell(newBoard, coordinate)) {
					locationsLeftToReveal.push(location);
					location = { ...newLocation };
					newLocation = { ...coordinate };
					break;
				}
			}
		}

		return reduce<Coordinate, BoardCellState[][]>(
			(prevBoard, location) => revealEmptyCluster(location, prevBoard),
			newBoard,
			locationsLeftToReveal
		);
	}
);

const ensureUnrevealedNotEmptyCell = (
	gameBoard: BoardCellState[][],
	{ row, col }: Coordinate
): boolean =>
	ensureUnrevealedCell(gameBoard, { row, col }) && gameBoard[row][col].cellValue !== EMPTY_CELL;

const ensureUnrevealedEmptyCell = (
	gameBoard: BoardCellState[][],
	{ row, col }: Coordinate
): boolean =>
	ensureUnrevealedCell(gameBoard, { row, col }) && gameBoard[row][col].cellValue === EMPTY_CELL;

const ensureUnrevealedCell = (gameBoard: BoardCellState[][], { row, col }: Coordinate): boolean =>
	!isNil(gameBoard[row]) && !isNil(gameBoard[row][col]) && !gameBoard[row][col].isRevealed;

export const renderBoardRow = curry(
	(
		{ cellsInColumn, cellSize, ...restBoardCellProps }: Omit<BoardCellProps, 'cellState'>,
		rowCellStates: BoardCellState[]
	): ReactElement<OverridableComponent<GridTypeMap>> => {
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
				{map(renderBoardCell({ cellsInColumn, cellSize, ...restBoardCellProps }), rowCellStates)}
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
