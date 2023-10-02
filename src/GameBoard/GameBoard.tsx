import { Grid } from '@mui/material';
import { FC } from 'react';
import { map } from 'lodash/fp';
import { renderBoardRow } from './functions';
import { GameBoardProps } from './types';
import { PROPS_BY_DIFFICULTY } from './constants';

export const GameBoard: FC<GameBoardProps> = ({ gameBoard, difficultyLevel, ...props }) => {
	const gameBoardDifficultyProps = PROPS_BY_DIFFICULTY[difficultyLevel];

	return (
		<Grid container direction='row' width='100vw'>
			{map(renderBoardRow({ ...props, ...gameBoardDifficultyProps }), gameBoard)}
		</Grid>
	);
};
