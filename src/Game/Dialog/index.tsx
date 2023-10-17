import { FC } from 'react';
import {
	Button,
	Dialog as MuiDialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';

export interface DialogProps {
	isOpen: boolean;
	close: () => void;
	closeButtonText: string;
	title?: string;
	content?: string;
}

const Dialog: FC<DialogProps> = ({
	isOpen,
	title = '',
	content = '',
	close,
	closeButtonText = '',
}) => (
	<MuiDialog open={isOpen}>
		<DialogTitle textAlign='center'>{title}</DialogTitle>
		<DialogContent>{content}</DialogContent>
		<DialogActions>
			<Button variant='outlined' autoFocus onClick={close}>
				{closeButtonText}
			</Button>
		</DialogActions>
	</MuiDialog>
);

export default Dialog;
