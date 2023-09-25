import { Dispatch, SetStateAction } from 'react';

export interface LoserDialogProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	resetGameBoard: () => void;
}
