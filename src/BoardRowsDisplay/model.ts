import { curry, identity, isEqual, isNil, pipe, random, reduce, set, times } from 'lodash/fp';
import { BOMB, EMPTY_CELL, INITIALIZED_CELL, PROPS_BY_DIFFICULTY } from './constants';
import { BoardCellState, Coordinate, DifficultyLevel, GameDifficultyProps } from './types';

export const initializeGameBoard = (difficultyLevel: DifficultyLevel): BoardCellState[][] => {
	const { bombsAmount, cellsInColumn, cellsInRow }: GameDifficultyProps =
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
	if (ensureOrdinaryCell(gameBoard, { row, col })) {
		const cell = gameBoard[row][col];
		const newCell = set<BoardCellState>('cellValue', cell.cellValue + 1, cell);
		const newGameBoard = set<BoardCellState[][]>(`${row}.${col}`, newCell, gameBoard);

		return newGameBoard;
	}

	return gameBoard;
};

const getCoordinatesAroundCell = ({ row, col }: Coordinate): Coordinate[] => [
	{ row: row - 1, col: col - 1 },
	{ row: row - 1, col },
	{ row: row - 1, col: col + 1 },
	{ row, col: col + 1 },
	{ row: row + 1, col: col + 1 },
	{ row: row + 1, col },
	{ row: row + 1, col: col - 1 },
	{ row, col: col - 1 },
];

const revealCell = (gameBoard: BoardCellState[][], { row, col }: Coordinate) => {
	if (!ensureCellInBounds(gameBoard, { row, col })) {
		return gameBoard;
	}

	const cell: BoardCellState = set<BoardCellState>('isRevealed', true, gameBoard[row][col]);

	return set<BoardCellState[][]>(`${row}.${col}`, cell, gameBoard);
};

export const revealEmptyCluster = (
	{ row, col }: Coordinate,
	gameBoard: BoardCellState[][]
): BoardCellState[][] => {
	let location: Coordinate = { row: -1, col: -1 };
	let nextLocation: Coordinate = { row, col };
	let newBoard: BoardCellState[][] = gameBoard;
	const locationsLeftToReveal: Coordinate[] = [];

	while (!isEqual(location, nextLocation)) {
		location = { ...nextLocation };
		newBoard = revealCell(newBoard, location);
		const coordinates: Coordinate[] = getCoordinatesAroundCell(location);

		for (const coordinate of coordinates) {
			if (ensureUnrevealedValuedCell(newBoard, coordinate)) {
				newBoard = revealCell(newBoard, coordinate);
			} else if (ensureUnrevealedEmptyCell(newBoard, coordinate)) {
				locationsLeftToReveal.push(location);
				location = { ...nextLocation };
				nextLocation = { ...coordinate };

				break;
			}
		}
	}

	return reduce<Coordinate, BoardCellState[][]>(
		(gameBoard, coordinate) => revealEmptyCluster(coordinate, gameBoard),
		newBoard,
		locationsLeftToReveal
	);
};

const ensureUnrevealedValuedCell = (
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
	ensureCellInBounds(gameBoard, { row, col }) && !gameBoard[row][col].isRevealed;

const ensureOrdinaryCell = (gameBoard: BoardCellState[][], { row, col }: Coordinate): boolean =>
	ensureCellInBounds(gameBoard, { row, col }) && gameBoard[row][col].cellValue != BOMB;

const ensureCellInBounds = (gameBoard: BoardCellState[][], { row, col }: Coordinate): boolean =>
	!isNil(gameBoard[row]) && !isNil(gameBoard[row][col]);
