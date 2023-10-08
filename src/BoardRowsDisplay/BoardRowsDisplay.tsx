import { Grid } from '@mui/material';
import { FC } from 'react';
import { map } from 'lodash/fp';
import { renderBoardRow } from './functions';
import { BoardRowsDisplayProps } from './types';
import { PROPS_BY_DIFFICULTY } from './constants';

export const BoardRowsDisplay: FC<BoardRowsDisplayProps> = ({
	gameBoard,
	difficultyLevel,
	...restBoardRowsDisplayProps
}) => {
	const gameBoardDifficultyProps = PROPS_BY_DIFFICULTY[difficultyLevel];

	return (
		<Grid container direction='row' width='100vw'>
			{map(
				renderBoardRow({ ...restBoardRowsDisplayProps, ...gameBoardDifficultyProps }),
				gameBoard
			)}
		</Grid>
	);
};
