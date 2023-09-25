import { FC } from 'react';
import { BoardCellProps } from './types';
import { Card, Grid, IconButton } from '@mui/material';
import { BOMB } from '../constants';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';

export const BoardCell: FC<BoardCellProps> = ({ cellValue }) => {
	return (
		<Grid item width={50} height={50}>
			<Card sx={{ width: 'inherit', height: 'inherit' }}>
				{cellValue === BOMB && (
					<IconButton sx={{ width: 'inherit', height: 'inherit' }}>
						<CrisisAlertIcon />
					</IconButton>
				)}
			</Card>
		</Grid>
	);
};
