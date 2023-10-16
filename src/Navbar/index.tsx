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
import { Dispatch, FC, SetStateAction } from 'react';
import { difficultyLevels, title, tooltipTitle } from './constants';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { map, over, path, pipe, upperFirst } from 'lodash/fp';
import { renderDifficultyLevelMenuItem } from './functions';
import { DifficultyLevel } from '../Board/types';

export interface NavbarProps {
	resetGameBoard: (difficultyLevel: DifficultyLevel) => void;
	setDifficultyLevel: Dispatch<SetStateAction<DifficultyLevel>>;
	difficultyLevel: DifficultyLevel;
}

const Navbar: FC<NavbarProps> = ({ resetGameBoard, setDifficultyLevel, difficultyLevel }) => {
	const startNewGame = (): void => resetGameBoard(difficultyLevel);

	return (
		<AppBar>
			<Toolbar disableGutters sx={{ width: 'inherit', height: '65px' }}>
				<Stack
					width='inherit'
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					mx={2}>
					<Stack direction='row'>
						<Tooltip title={tooltipTitle}>
							<IconButton onClick={startNewGame}>
								<RestartAltIcon fontSize='large' htmlColor='white' />
							</IconButton>
						</Tooltip>
						<Divider />
						<Select
							sx={{ color: 'white', ml: 2 }}
							onChange={pipe(path('target.value'), over([setDifficultyLevel, resetGameBoard]))}
							renderValue={upperFirst}
							value={difficultyLevel}>
							{map(renderDifficultyLevelMenuItem, difficultyLevels)}
						</Select>
					</Stack>
					<Typography variant='h3' sx={{ userSelect: 'none' }}>
						{title}
					</Typography>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
