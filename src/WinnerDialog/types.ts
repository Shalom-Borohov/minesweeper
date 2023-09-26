import { Dispatch, SetStateAction } from "react";

export interface WinnerDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  resetGameBoard: () => void;
}
