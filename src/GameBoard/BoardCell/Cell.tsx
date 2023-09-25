import { FC, useState } from 'react';
import { BoardCellProps } from './types';
import { Box, Card, CardActionArea, Grid, Typography } from '@mui/material';
import { BOMB } from '../constants';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import TourIcon from '@mui/icons-material/Tour';
import { inheritSizeStyle } from './styles';
import { CELL_HEIGHT, CELL_VALUE_COLORS, CELL_WIDTH } from './constants';
import { F, T, over, pipe } from 'lodash/fp';

export const BoardCell: FC<BoardCellProps> = ({ cellValue }) => {
	const [isRevealed, setIsRevealed] = useState<boolean>(false);
	const [isFlagged, setIsFlagged] = useState<boolean>(false);

	const preventDefault = (event: MouseEvent): void => event.preventDefault();
	const toggleFlagged = (): void => setIsFlagged((isFlagged) => !isFlagged);

	return (
		<Grid item width={CELL_WIDTH} height={CELL_HEIGHT}>
			<Card
				sx={{
					...inheritSizeStyle,
					backgroundColor: isRevealed ? 'lightgray' : 'white',
					borderRadius: 0,
				}}>
				<CardActionArea
					sx={{ ...inheritSizeStyle, ':hover': { backgroundColor: '#b5ef77' } }}
					onClick={over([pipe(T, setIsRevealed), pipe(F, setIsFlagged)])}
					disabled={isRevealed}
					onContextMenu={over([preventDefault, toggleFlagged])}>
					<Box
						width='inherit'
						height='inherit'
						display='flex'
						alignItems='center'
						justifyContent='center'>
						{isFlagged ? (
							<TourIcon htmlColor='red' />
						) : (
							isRevealed &&
							(cellValue === BOMB ? (
								<CrisisAlertIcon htmlColor='red' />
							) : (
								<Typography
									fontWeight='bold'
									fontSize='x-large'
									color={CELL_VALUE_COLORS[cellValue]}>
									{cellValue === 0 ? '' : cellValue}
								</Typography>
							))
						)}
					</Box>
				</CardActionArea>
			</Card>
		</Grid>
	);
};
