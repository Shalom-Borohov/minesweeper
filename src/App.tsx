import { FC, useState } from 'react';
import { Navbar } from './Navbar';
import { GameBoard, initializeGameBoard } from './GameBoard';
import { pipe } from 'lodash/fp';
import { LoserDialog } from './LoserDialog';
import { BOARD_WIDTH, BOMBS_AMOUNT } from './GameBoard/constants';
import { Icon, Stack, Typography } from '@mui/material';
import TourIcon from '@mui/icons-material/Tour';
import { CELL_WIDTH } from './GameBoard/BoardCell/constants';

export const App: FC = () => {
	const [gameBoard, setGameBoard] = useState<number[][]>(initializeGameBoard);
	const [isLoserDialogOpen, setIsLoserDialogOpen] = useState<boolean>(false);
	const [leftFlags, setLeftFlags] = useState<number>(BOMBS_AMOUNT);

	const resetGameBoard: () => void = pipe(initializeGameBoard, setGameBoard);

	return (
		<>
			<Navbar {...{ resetGameBoard }} />
			<Stack direction='row' justifyContent='center'>
				<Stack direction='row' width={CELL_WIDTH * BOARD_WIDTH} mb={1} alignItems='baseline'>
					<Icon fontSize='medium'>
						<TourIcon htmlColor='red' />
					</Icon>
					<Typography fontSize='x-large' fontWeight='400' ml={1} textAlign='start'>
						{leftFlags}
					</Typography>
				</Stack>
			</Stack>
			<GameBoard {...{ gameBoard, setIsLoserDialogOpen }} />
			<LoserDialog
				isOpen={isLoserDialogOpen}
				setIsOpen={setIsLoserDialogOpen}
				{...{ resetGameBoard }}
			/>
		</>
	);
};
