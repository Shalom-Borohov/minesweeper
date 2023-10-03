import { Icon, Stack, Typography } from '@mui/material';
import TourIcon from '@mui/icons-material/Tour';
import { FC } from 'react';
import { FlagsAmountIndicatorProps } from './types';
import { PROPS_BY_DIFFICULTY } from '../GameBoard/constants';

export const FlagsAmountIndicator: FC<FlagsAmountIndicatorProps> = ({
	difficultyLevel,
	flagsAmount,
}) => {
	const { columnCellsAmount, cellSize } = PROPS_BY_DIFFICULTY[difficultyLevel];

	return (
		<Stack direction='row' justifyContent='center'>
			<Stack direction='row' width={cellSize * columnCellsAmount} mb={1} alignItems='baseline'>
				<Icon fontSize='medium'>
					<TourIcon htmlColor='red' />
				</Icon>
				<Typography
					fontSize='x-large'
					fontWeight='400'
					ml={1}
					textAlign='start'
					sx={{ userSelect: 'none' }}>
					{flagsAmount}
				</Typography>
			</Stack>
		</Stack>
	);
};
