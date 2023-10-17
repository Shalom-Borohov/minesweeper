import { Icon, Stack, Typography } from '@mui/material';
import TourIcon from '@mui/icons-material/Tour';
import { FC } from 'react';
import { useGame } from '../../GameProvider';

const FlagsCounter: FC = () => {
	const { flagsAmount } = useGame();

	return (
		<Stack direction='row' justifyContent='center'>
			<Stack direction='row' mb={1} alignItems='baseline'>
				<Icon fontSize='medium'>
					<TourIcon color='info' />
				</Icon>
				<Typography ml={1} variant='h5' sx={{ userSelect: 'none' }}>
					{flagsAmount}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default FlagsCounter;
