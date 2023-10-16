import { Icon, Stack, Typography } from '@mui/material';
import TourIcon from '@mui/icons-material/Tour';
import { FC } from 'react';
import { DifficultyLevel } from '../Board/types';
import { settingsByDifficulty } from '../Board/constants';

interface FlagsCounterProps {
	difficultyLevel: DifficultyLevel;
	flagsAmount: number;
}

const FlagsCounter: FC<FlagsCounterProps> = ({ difficultyLevel, flagsAmount }) => {
	const { cellsInRow, cellSize } = settingsByDifficulty[difficultyLevel];

	return (
		<Stack direction='row' justifyContent='center'>
			<Stack direction='row' width={cellSize * cellsInRow} mb={1} alignItems='baseline'>
				<Icon fontSize='medium'>
					<TourIcon htmlColor='red' />
				</Icon>
				<Typography ml={1} variant='h5' sx={{ userSelect: 'none' }}>
					{flagsAmount}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default FlagsCounter;
