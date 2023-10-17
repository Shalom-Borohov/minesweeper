import { FC } from 'react';
import FlagsCounter from './FlagsCounter';
import Board from './Board';
import { Box, Stack } from '@mui/material';
import { useGame } from '../GameProvider';

const Game: FC = () => {
	const { cellSize, cellsInRow } = useGame();

	return (
		<Box width='100vw' display='flex' justifyContent='center'>
			<Stack direction='column' width={cellsInRow * cellSize} alignItems='flex-start'>
				<FlagsCounter />
				<Board />
			</Stack>
		</Box>
	);
};

export default Game;
