import { Dispatch, SetStateAction } from 'react';

export interface BoardCellProps {
	cellValue: number;
	setIsLoserDialogOpen: Dispatch<SetStateAction<boolean>>;
}
