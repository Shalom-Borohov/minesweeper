import { FC } from 'react';
import { Navbar } from './Navbar';
import { GameBoard } from './GameBoard';
import { initGameBoard } from './GameBoard';

console.table(initGameBoard());

export const App: FC = () => {
	return (
		<>
			<Navbar />
			<GameBoard />
		</>
	);
};
