import {
	map,
	each,
	random,
	constant,
	times,
	isNil,
	add,
	curry,
	LodashAdd1x1,
	pipe,
} from 'lodash/fp';
import { BOARD_LENGTH, BOARD_WIDTH, BOMB, BOMBS_AMOUNT, EMPTY_CELL } from './constants';
import { Coordinate } from './types';
import { ReactElement } from 'react';
import { Grid, GridTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { BoardCell, BoardCellProps } from './BoardCell';

// eslint-disable-next-line lodash-fp/use-fp
import { CurriedFunction1 } from 'lodash';

export const initializeGameBoard = (): number[][] => {
	const gameBoard: number[][] = createEmptyBoard();

	const bombsCoordinates: Coordinate[] = times<Coordinate>(() => addBomb(gameBoard), BOMBS_AMOUNT);
	const directions: CurriedFunction1<Coordinate, Coordinate>[] = createDirections();

	each(incrementCellsAroundBomb(gameBoard, directions), bombsCoordinates);

	return gameBoard;
};

const createEmptyBoard = (): number[][] =>
	times<number[]>(() => times<number>(constant(EMPTY_CELL), BOARD_WIDTH), BOARD_LENGTH);

const addBomb = (gameBoard: number[][]): Coordinate => {
	const randomFromStart = random(0);
	let row = randomFromStart(BOARD_LENGTH - 1);
	let col = randomFromStart(BOARD_WIDTH - 1);

	while (gameBoard[row][col] === BOMB) {
		row = randomFromStart(BOARD_LENGTH - 1);
		col = randomFromStart(BOARD_WIDTH - 1);
	}

	gameBoard[row][col] = BOMB;

	return { row, col };
};

const createDirections = () => {
	const inc: LodashAdd1x1 = add(1);
	const dec: LodashAdd1x1 = add(-1);
	const addNone: LodashAdd1x1 = pipe(inc, dec);

	const directionsInstructions: LodashAdd1x1[][] = [
		[dec, dec],
		[dec, addNone],
		[dec, inc],
		[addNone, dec],
		[addNone, inc],
		[inc, dec],
		[inc, addNone],
		[inc, inc],
	];

	return map(createDirectionFromInstruction, directionsInstructions);
};

const createDirection = curry(
	(rowAdd: LodashAdd1x1, colAdd: LodashAdd1x1, { row, col }: Coordinate): Coordinate => ({
		row: rowAdd(row),
		col: colAdd(col),
	})
);

const createDirectionFromInstruction = (
	directionInstruction: LodashAdd1x1[]
): CurriedFunction1<Coordinate, Coordinate> =>
	createDirection(directionInstruction[0], directionInstruction[1]);

const incrementCell = curry((gameBoard: number[][], { row, col }: Coordinate): void => {
	if (!isNil(gameBoard[row]) && !isNil(gameBoard[row][col]) && gameBoard[row][col] != BOMB) {
		gameBoard[row][col] += 1;
	}
});

const incrementCellsAroundBomb =
	(gameBoard: number[][], directions: CurriedFunction1<Coordinate, Coordinate>[]) =>
	(coordinate: Coordinate): void => {
		const getNewCoordinate =
			(coordinate: Coordinate) =>
			(changeDirection: CurriedFunction1<Coordinate, Coordinate>): Coordinate =>
				changeDirection(coordinate);

		each(pipe(getNewCoordinate(coordinate), incrementCell(gameBoard)), directions);
	};

export const renderBoardRow = (
	rowValues: number[]
): ReactElement<OverridableComponent<GridTypeMap>> => (
	<Grid container item direction='row'>
		{map(renderBoardCell, rowValues)}
	</Grid>
);

const renderBoardCell = (cellValue: number): ReactElement<BoardCellProps> => (
	<BoardCell {...{ cellValue }} />
);
