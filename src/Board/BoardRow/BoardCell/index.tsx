import { FC, SyntheticEvent } from 'react';
import { Box, Card, CardActionArea, Grid, Typography } from '@mui/material';
import { BOMB } from '../../constants';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import TourIcon from '@mui/icons-material/Tour';
import { CELL_VALUE_COLORS } from './constants';
import { Cell, GameDifficultyProps } from '../../types';

export interface BoardCellProps extends Pick<GameDifficultyProps, 'cellsInColumn' | 'cellSize'> {
	cellState: Cell;
	updateGameBoard: (row: number, column: number, cellState: Cell) => void;
}

export const BoardCell: FC<BoardCellProps> = ({
	cellState,
	updateGameBoard,
	cellsInColumn,
	cellSize,
}) => {
	const { cellValue, isFlagged, isRevealed, row, column } = cellState;

	const toggleFlagged = (event: SyntheticEvent): void => {
		event.preventDefault();

		updateGameBoard(row, column, { ...cellState, isFlagged: !isFlagged });
	};

	const revealCell = (): void => {
		updateGameBoard(row, column, { ...cellState, isRevealed: true });
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
