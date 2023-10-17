import { FC } from 'react';
import Navbar from './Navbar';
import Game from './Game';
import { GameProvider } from './GameProvider';
import { ThemeProvider } from '@emotion/react';
import { theme } from './ThemeProvider';

export const App: FC = () => (
	<ThemeProvider theme={theme}>
		<GameProvider>
			<Navbar />
			<Game />
		</GameProvider>
	</ThemeProvider>
);
