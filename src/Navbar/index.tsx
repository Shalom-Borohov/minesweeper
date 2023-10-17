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
import { FC } from 'react';
import { difficultyLevels, title, tooltipTitle } from './constants';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { map, over, path, pipe, upperFirst } from 'lodash/fp';
import { renderDifficultyLevelMenuItem } from './functions';
import { useGame } from '../GameProvider';

const Navbar: FC = () => {
	const { resetGameBoard, setDifficultyLevel, difficultyLevel, startNewGame } = useGame();

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
