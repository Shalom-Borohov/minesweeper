import { MenuItem, MenuItemOwnProps } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { upperFirst } from 'lodash/fp';
import { DifficultyLevel } from '../Board/types';
import { ReactElement } from 'react';

export const renderDifficultyLevelMenuItem = (
	difficultyLevel: DifficultyLevel
): ReactElement<MenuItemOwnProps> => (
	<MenuItem value={difficultyLevel} key={uuidv4()}>
		{upperFirst(difficultyLevel)}
	</MenuItem>
);
