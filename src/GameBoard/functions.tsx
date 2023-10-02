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
import { BOMB, EMPTY_CELL, PROPS_BY_DIFFICULTY } from './constants';
import { Coordinate, DifficultyLevel, GameBoardDifficultyProps } from './types';
import { ReactElement } from 'react';
import { Grid, GridTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { BoardCell, BoardCellProps } from './BoardCell';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line lodash-fp/use-fp
import { CurriedFunction1 } from 'lodash';

export const initializeGameBoard = (difficultyLevel: DifficultyLevel): number[][] => {
	const { bombsAmount, rowCellsAmount, columnCellsAmount }: GameBoardDifficultyProps =
		PROPS_BY_DIFFICULTY[difficultyLevel];

	const gameBoard: number[][] = createEmptyBoard(rowCellsAmount, columnCellsAmount);

	const bombsCoordinates: Coordinate[] = times<Coordinate>(
		() => addBomb(gameBoard, rowCellsAmount, columnCellsAmount),
		bombsAmount
	);

	const directions: CurriedFunction1<Coordinate, Coordinate>[] = createDirections();

	each(incrementCellsAroundBomb(gameBoard, directions), bombsCoordinates);

	return gameBoard;
};

const createEmptyBoard = (rowCellsAmount: number, columnCellsAmount: number): number[][] =>
	times<number[]>(() => times<number>(constant(EMPTY_CELL), rowCellsAmount), columnCellsAmount);

const addBomb = (
	gameBoard: number[][],
	rowCellsAmount: number,
	columnCellsAmount: number
): Coordinate => {
	const randomFromStart = random(0);
	let row = randomFromStart(columnCellsAmount - 1);
	let col = randomFromStart(rowCellsAmount - 1);

	while (gameBoard[row][col] === BOMB) {
		row = randomFromStart(columnCellsAmount - 1);
		col = randomFromStart(rowCellsAmount - 1);
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

export const renderBoardRow = curry(
	(
		{ rowCellsAmount, cellSize, ...restBoardCellProps }: Omit<BoardCellProps, 'cellValue'>,
		rowValues: number[]
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
				{map(renderBoardCell({ rowCellsAmount, cellSize, ...restBoardCellProps }), rowValues)}
			</Grid>
		);
	}
);

const renderBoardCell = curry(
	(
		boardCellProps: Omit<BoardCellProps, 'cellValue'>,
		cellValue: number
	): ReactElement<BoardCellProps> => (
		<BoardCell {...{ cellValue }} key={uuidv4()} {...boardCellProps} />
	)
);
