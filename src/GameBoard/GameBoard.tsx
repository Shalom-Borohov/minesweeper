import { Grid } from '@mui/material';
import { FC, useState } from 'react';
import { initializeGameBoard } from '.';
import { map } from 'lodash/fp';
import { renderBoardRow } from './functions';

export const GameBoard: FC = () => {
	const [gameBoard] = useState<number[][]>(initializeGameBoard);

	return (
		<Grid container direction='column'>
			{map(renderBoardRow, gameBoard)}
		</Grid>
	);
};
