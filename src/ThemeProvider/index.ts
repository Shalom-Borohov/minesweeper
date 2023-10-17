import { PaletteOptions, createTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Theme {
		palette: {
			info: {
				main: string;
				light: string;
			};
		};
	}
	interface ThemeOptions {
		palette?: PaletteOptions;
	}
}

export const theme: Theme = createTheme({
	palette: { info: { main: '#FF0000', light: '#FFFFFF' } },
});
