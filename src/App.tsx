import { FC } from 'react';
import { Navbar } from './Navbar';
import { GameBoard } from './GameBoard';

export const App: FC = () => {
	return (
		<>
			<Navbar />
			<GameBoard />
		</>
	);
};
