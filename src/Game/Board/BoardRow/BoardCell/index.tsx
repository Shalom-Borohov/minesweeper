import { FC, SyntheticEvent } from 'react';
import { Box, Card, CardActionArea, Grid, Typography } from '@mui/material';
import { bomb } from '../../../constants';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import TourIcon from '@mui/icons-material/Tour';
import { cellValueColors } from './constants';
import { Cell } from '../../../../Types';
import { useGame } from '../../../../GameProvider';

export interface BoardCellProps {
	cell: Cell;
	revealCells: (cell: Cell) => void;
	toggleFlags: (cell: Cell) => void;
}

const BoardCell: FC<BoardCellProps> = ({ cell, revealCells, toggleFlags }) => {
	const { cellValue, isFlagged, isRevealed } = cell;
	const { cellSize, cellsInColumn } = useGame();

	const toggleFlagged = (event: SyntheticEvent): void => {
		event.preventDefault();

		toggleFlags({ ...cell, isFlagged: !isFlagged });
	};

	const revealCell = (): void => {
		if (!isFlagged) {
			revealCells({ ...cell, isRevealed: true });
		}
	};

	return (
		<Grid
			item
			width={cellSize}
			sx={{ [`@media (max-width: ${cellSize * cellsInColumn}px)`]: { width: cellSize / 2 } }}
			height='inherit'>
			<Card
				sx={{
					height: 'inherit',
					width: 'inherit',
					backgroundColor: isRevealed ? 'lightgray' : 'white',
					borderRadius: 0,
				}}>
				<CardActionArea
					sx={{
						height: 'inherit',
						width: 'inherit',
						':hover': { backgroundColor: '#b5ef77' },
					}}
					disableTouchRipple
					onContextMenu={toggleFlagged}
					onClick={revealCell}
					disabled={isRevealed}>
					<Box
						width='inherit'
						height='inherit'
						display='flex'
						alignItems='center'
						justifyContent='center'>
						{isFlagged ? (
							<TourIcon color='info' />
						) : (
							isRevealed &&
							(cellValue === bomb ? (
								<CrisisAlertIcon color='info' />
							) : (
								<Typography fontWeight='bold' fontSize='x-large' color={cellValueColors[cellValue]}>
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

export default BoardCell;
