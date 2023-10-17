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
import { Cell, Coordinate, DifficultyLevel, BoardSettings } from '../Types';
import { bomb, emptyCell, initializedCell, settingsByDifficulty } from '../Game/constants';

export const initializeGameBoard = (difficultyLevel: DifficultyLevel): Cell[][] => {
	const { bombsAmount, cellsInColumn, cellsInRow }: BoardSettings =
		settingsByDifficulty[difficultyLevel];

	const gameBoard: Cell[][] = createEmptyBoard(cellsInColumn, cellsInRow);

	const boardWithBombs = pipe(
		times<number>(identity),
		reduce<number, Cell[][]>(addBomb(cellsInColumn, cellsInRow), gameBoard)
	)(bombsAmount);

	return boardWithBombs;
};

const createEmptyBoard = (cellsInColumn: number, cellsInRow: number): Cell[][] =>
	times<Cell[]>(
		(row) => times<Cell>((col) => ({ ...initializedCell, row, col }), cellsInRow),
		cellsInColumn
	);

const addBomb = curry(
	(cellsInColumn: number, cellsInRow: number, gameBoard: Cell[][]): Cell[][] => {
		const randomFromStart = random(0);
		let row = randomFromStart(cellsInColumn - 1);
		let col = randomFromStart(cellsInRow - 1);

		while (gameBoard[row][col].cellValue === bomb) {
			row = randomFromStart(cellsInColumn - 1);
			col = randomFromStart(cellsInRow - 1);
		}

		const boardWithBomb = set<Cell[][]>(
			`${row}.${col}`,
			{ ...initializedCell, cellValue: bomb, row, col },
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

	const cell: Cell = pipe(set('isFlagged', false), set('isRevealed', true))(gameBoard[row][col]);

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
	ensureUnrevealedCell(gameBoard, { row, col }) && gameBoard[row][col].cellValue !== emptyCell;

const ensureUnrevealedEmptyCell = (gameBoard: Cell[][], { row, col }: Coordinate): boolean =>
	ensureUnrevealedCell(gameBoard, { row, col }) && gameBoard[row][col].cellValue === emptyCell;

const ensureUnrevealedCell = (gameBoard: Cell[][], { row, col }: Coordinate): boolean =>
	ensureCellInBounds(gameBoard, { row, col }) && !gameBoard[row][col].isRevealed;

const ensureOrdinaryCell = (gameBoard: Cell[][], { row, col }: Coordinate): boolean =>
	ensureCellInBounds(gameBoard, { row, col }) && gameBoard[row][col].cellValue != bomb;

const ensureCellInBounds = (gameBoard: Cell[][], { row, col }: Coordinate): boolean =>
	!isNil(gameBoard[row]) && !isNil(gameBoard[row][col]);

export const revealBoard = map<Cell[], Cell[]>(
	map<Cell, Cell>(pipe(set('isRevealed', true), set('isFlagged', false)))
);

export const ensureGameWon = (gameBoard: Cell[][], bombsAmount: number): boolean =>
	pipe(
		flatten<Cell>,
		reject<Cell>(prop<Cell, 'isRevealed'>('isRevealed')),
		propEq<number>('length', bombsAmount)
	)(gameBoard);
