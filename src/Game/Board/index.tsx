import { Grid } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';
import { map } from 'lodash/fp';
import { renderBoardRow } from './functions';
import { Cell, DifficultyLevel } from '../Types';
import { settingsByDifficulty } from '../constants';

export interface BoardProps {
	gameBoard: Cell[][];
	setIsLoserDialogOpen: Dispatch<SetStateAction<boolean>>;
	setIsWinnerDialogOpen: Dispatch<SetStateAction<boolean>>;
	difficultyLevel: DifficultyLevel;
	revealCells: (cell: Cell) => void;
	toggleFlags: (cell: Cell) => void;
}

const Board: FC<BoardProps> = ({ gameBoard, difficultyLevel, ...restBoardRowProps }) => {
	const gameBoardDifficultyProps = settingsByDifficulty[difficultyLevel];

	return (
		<Grid container direction='row' width='100vw'>
			{map(renderBoardRow({ ...restBoardRowProps, ...gameBoardDifficultyProps }), gameBoard)}
		</Grid>
	);
};

export default Board;
