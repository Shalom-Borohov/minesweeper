import {
	AppBar,
	Divider,
	IconButton,
	Select,
	Stack,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import { FC, useContext } from 'react';
import { DIFFICULTY_LEVELS, TITLE, TOOLTIP_TITLE } from './constants';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { NavbarProps } from './types';
import { RevealedCellsContextValue } from '../context/types';
import { RevealedCellsContext } from '../context';
import { map, over, path, pipe, upperFirst } from 'lodash/fp';
import { renderDifficultyLevelMenuItem } from './functions';

export const Navbar: FC<NavbarProps> = ({
	resetGameBoard,
	setDifficultyLevel,
	difficultyLevel,
}) => {
	const { resetRevealedCells } = useContext<RevealedCellsContextValue>(RevealedCellsContext);

	const startNewGame = () => over([resetGameBoard, resetRevealedCells])();

	return (
		<AppBar>
			<Toolbar
				disableGutters
				sx={{ width: 'inherit', '@media (min-width: 600px)': { minHeight: 'inherit' } }}>
				<Stack
					width='inherit'
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					mx={2}>
					<Stack direction='row'>
						<Tooltip title={TOOLTIP_TITLE}>
							<IconButton sx={{ ':focus': { outline: 0 } }} onClick={startNewGame}>
								<RestartAltIcon fontSize='large' htmlColor='white' />
							</IconButton>
						</Tooltip>
						<Divider />
						<Select
							sx={{ color: 'white', ml: 2 }}
							onChange={pipe(path('target.value'), over([setDifficultyLevel, resetGameBoard]))}
							renderValue={upperFirst}
							value={difficultyLevel}>
							{map(renderDifficultyLevelMenuItem, DIFFICULTY_LEVELS)}
						</Select>
					</Stack>
					<Typography variant='h3' sx={{ userSelect: 'none' }}>
						{TITLE}
					</Typography>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
