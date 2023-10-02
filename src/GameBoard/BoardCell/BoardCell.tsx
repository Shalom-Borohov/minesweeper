import { FC, useState, useContext } from 'react';
import { BoardCellProps } from './types';
import { Box, Card, CardActionArea, Grid, Typography } from '@mui/material';
import { BOMB } from '../constants';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import TourIcon from '@mui/icons-material/Tour';
import { inheritSizeStyle } from './styles';
import { CELL_VALUE_COLORS, LOSER_DIALOG_DELAY_TIME_MS } from './constants';
import { F, T, over, pipe } from 'lodash/fp';
import { RevealedCellsContextValue } from '../../context/types';
import { RevealedCellsContext } from '../../context';

export const BoardCell: FC<BoardCellProps> = ({
	cellValue,
	setIsLoserDialogOpen,
	setIsWinnerDialogOpen,
	bombsAmount,
	columnCellsAmount,
	rowCellsAmount,
	cellSize,
}) => {
	const [isRevealed, setIsRevealed] = useState<boolean>(false);
	const [isFlagged, setIsFlagged] = useState<boolean>(false);
	const { incrementRevealedCells, revealedCells } =
		useContext<RevealedCellsContextValue>(RevealedCellsContext);

	const stopPropagation = (event: MouseEvent): void => event.stopPropagation();
	const preventDefault = (event: MouseEvent): void => event.preventDefault();
	const toggleFlagged = (): void => setIsFlagged((isFlagged: boolean): boolean => !isFlagged);

	const checkOpenLoserDialog = (): void => {
		cellValue === BOMB && setTimeout(pipe(T, setIsLoserDialogOpen), LOSER_DIALOG_DELAY_TIME_MS);
	};

	const checkOpenWinnerDialog = (): void => {
		const totalCells = columnCellsAmount * rowCellsAmount;

		setIsWinnerDialogOpen(cellValue !== BOMB && totalCells - revealedCells - 1 === bombsAmount);
	};

	return (
		<Grid
			item
			width={cellSize}
			sx={{ [`@media (max-width: ${cellSize * rowCellsAmount}px)`]: { width: cellSize / 2 } }}
			height='inherit'>
			<Card
				sx={{
					...inheritSizeStyle,
					backgroundColor: isRevealed ? 'lightgray' : 'white',
					borderRadius: 0,
				}}>
				<CardActionArea
					sx={{ ...inheritSizeStyle, ':hover': { backgroundColor: '#b5ef77' } }}
					disableTouchRipple
					onContextMenu={over([stopPropagation, preventDefault, toggleFlagged])}
					onClick={over([
						incrementRevealedCells,
						pipe(T, setIsRevealed),
						pipe(F, setIsFlagged),
						checkOpenLoserDialog,
						checkOpenWinnerDialog,
					])}
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
