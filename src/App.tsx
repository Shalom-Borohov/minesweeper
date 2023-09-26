import { FC, useState } from "react";
import { Navbar } from "./Navbar";
import { GameBoard, initializeGameBoard } from "./GameBoard";
import { pipe } from "lodash/fp";
import { LoserDialog } from "./LoserDialog";
import { FlagsAmountIndicator } from "./FlagsAmountIndicator";
import { RevealedCellsProvider } from "./context/RevealedCellsContext";
import { WinnerDialog } from "./WinnerDialog";

export const App: FC = () => {
  const [gameBoard, setGameBoard] = useState<number[][]>(initializeGameBoard());
  const [isLoserDialogOpen, setIsLoserDialogOpen] = useState<boolean>(false);
  const [isWinnerDialogOpen, setIsWinnerDialogOpen] = useState<boolean>(false);

  const resetGameBoard: () => void = pipe(initializeGameBoard, setGameBoard);

  return (
    <RevealedCellsProvider>
      <Navbar {...{ resetGameBoard }} />
      <FlagsAmountIndicator />
      <GameBoard
        {...{ gameBoard, setIsLoserDialogOpen, setIsWinnerDialogOpen }}
      />
      <WinnerDialog
        isOpen={isWinnerDialogOpen}
        setIsOpen={setIsWinnerDialogOpen}
        {...{ resetGameBoard }}
      />
      <LoserDialog
        isOpen={isLoserDialogOpen}
        setIsOpen={setIsLoserDialogOpen}
        {...{ resetGameBoard }}
      />
    </RevealedCellsProvider>
  );
};
