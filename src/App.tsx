import { FC } from 'react';
import { Navbar } from './Navbar';
import { GameBoard } from './GameBoard';
import { Box } from '@mui/material';

export const App: FC = () => {
	return (
		<>
			<Navbar />
			<Box>
				<GameBoard />
			</Box>
		</>
	);
};
