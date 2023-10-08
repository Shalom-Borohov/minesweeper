import { MenuItem } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { DifficultyLevel } from '../BoardRowsDisplay/types';
import { upperFirst } from 'lodash/fp';

export const renderDifficultyLevelMenuItem = (difficultyLevel: DifficultyLevel) => (
	<MenuItem value={difficultyLevel} key={uuidv4()}>
		{upperFirst(difficultyLevel)}
	</MenuItem>
);
