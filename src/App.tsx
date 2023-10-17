import { FC } from 'react';
import Navbar from './Navbar';
import Game from './Game';
import { GameProvider } from './GameProvider';

export const App: FC = () => (
	<GameProvider>
		<Navbar />
		<Game />
	</GameProvider>
);
