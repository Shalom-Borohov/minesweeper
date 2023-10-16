import {
	curry,
	flatten,
	identity,
	isNil,
	map,
	pipe,
	prop,
	propEq,
	random,
	reduce,
	reject,
	set,
	times,
} from 'lodash/fp';
import { Cell, Coordinate, DifficultyLevel, GameDifficultyProps } from '../Board/types';
import { BOMB, EMPTY_CELL, INITIALIZED_CELL, PROPS_BY_DIFFICULTY } from '../Board/constants';

export const initializeGameBoard = (difficultyLevel: DifficultyLevel): Cell[][] => {
	const { bombsAmount, cellsInColumn, cellsInRow }: GameDifficultyProps =
		PROPS_BY_DIFFICULTY[difficultyLevel];

	const gameBoard: Cell[][] = createEmptyBoard(cellsInColumn, cellsInRow);

	const boardWithBombs = pipe(
		times<number>(identity),
		reduce<number, Cell[][]>(addBomb(cellsInColumn, cellsInRow), gameBoard)
	)(bombsAmount);

	return boardWithBombs;
};

const createEmptyBoard = (cellsInColumn: number, cellsInRow: number): Cell[][] =>
	times<Cell[]>(
		(row) => times<Cell>((column) => ({ ...INITIALIZED_CELL, row, column }), cellsInRow),
		cellsInColumn
	);

const addBomb = curry(
	(cellsInColumn: number, cellsInRow: number, gameBoard: Cell[][]): Cell[][] => {
		const randomFromStart = random(0);
		let row = randomFromStart(cellsInColumn - 1);
		let col = randomFromStart(cellsInRow - 1);

		while (gameBoard[row][col].cellValue === BOMB) {
			row = randomFromStart(cellsInColumn - 1);
			col = randomFromStart(cellsInRow - 1);
		}

		const boardWithBomb = set<Cell[][]>(
			`${row}.${col}`,
			{ ...INITIALIZED_CELL, cellValue: BOMB, row, column: col },
			gameBoard
		);

		return increaseValuesAroundBomb(row, col, boardWithBomb);
	}
);

const increaseValuesAroundBomb = (row: number, col: number, gameBoard: Cell[][]): Cell[][] =>
	reduce<Coordinate, Cell[][]>(
		increaseCellValue,
		gameBoard,
		getCoordinatesAroundCell({ row, col })
	);

const increaseCellValue = (gameBoard: Cell[][], { row, col }: Coordinate) => {
	if (ensureOrdinaryCell(gameBoard, { row, col })) {
		const cell = gameBoard[row][col];
		const newCell = set<Cell>('cellValue', cell.cellValue + 1, cell);
		const newGameBoard = set<Cell[][]>(`${row}.${col}`, newCell, gameBoard);

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

const revealCell = (gameBoard: Cell[][], { row, col }: Coordinate) => {
	if (!ensureCellInBounds(gameBoard, { row, col })) {
		return gameBoard;
	}

	const cell: Cell = set<Cell>('isRevealed', true, gameBoard[row][col]);

	return set<Cell[][]>(`${row}.${col}`, cell, gameBoard);
};

export const revealEmptyCell = (coordinate: Coordinate, gameBoard: Cell[][]): Cell[][] => {
	if (ensureUnrevealedValuedCell(gameBoard, coordinate)) {
		return revealCell(gameBoard, coordinate);
	}

	if (ensureUnrevealedEmptyCell(gameBoard, coordinate)) {
		return reduce<Coordinate, Cell[][]>(
			(gameBoard, coordinate) => revealEmptyCell(coordinate, gameBoard),
			revealCell(gameBoard, coordinate),
			getCoordinatesAroundCell(coordinate)
		);
	}

	return gameBoard;
};

const ensureUnrevealedValuedCell = (gameBoard: Cell[][], { row, col }: Coordinate): boolean =>
	ensureUnrevealedCell(gameBoard, { row, col }) && gameBoard[row][col].cellValue !== EMPTY_CELL;

const ensureUnrevealedEmptyCell = (gameBoard: Cell[][], { row, col }: Coordinate): boolean =>
	ensureUnrevealedCell(gameBoard, { row, col }) && gameBoard[row][col].cellValue === EMPTY_CELL;

const ensureUnrevealedCell = (gameBoard: Cell[][], { row, col }: Coordinate): boolean =>
	ensureCellInBounds(gameBoard, { row, col }) && !gameBoard[row][col].isRevealed;

const ensureOrdinaryCell = (gameBoard: Cell[][], { row, col }: Coordinate): boolean =>
	ensureCellInBounds(gameBoard, { row, col }) && gameBoard[row][col].cellValue != BOMB;

const ensureCellInBounds = (gameBoard: Cell[][], { row, col }: Coordinate): boolean =>
	!isNil(gameBoard[row]) && !isNil(gameBoard[row][col]);

export const revealBoard = map<Cell[], Cell[]>(
	map<Cell, Cell>(pipe(set('isRevealed', true), set('isFlagged', false)))
);

export const ensureGameLost = (cellValue: number, isRevealed: boolean): boolean =>
	cellValue === BOMB && isRevealed;

export const ensureRevealedEmptyCell = (cellValue: number, isRevealed: boolean): boolean =>
	cellValue === EMPTY_CELL && isRevealed;

export const ensureGameWon = (gameBoard: Cell[][], bombsAmount: number): boolean =>
	pipe(
		flatten<Cell>,
		reject<Cell>(prop<Cell, 'isRevealed'>('isRevealed')),
		propEq<number>('length', bombsAmount)
	)(gameBoard);
