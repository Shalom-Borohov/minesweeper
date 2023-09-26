import { FC, PropsWithChildren, createContext, useState } from "react";
import { add, constant } from "lodash/fp";
import { RevealedCellsContextValue } from "./types";

export const RevealedCellsContext = createContext<RevealedCellsContextValue>({
  revealedCells: 0,
  incrementRevealedCells: constant(null),
  resetRevealedCells: constant(null),
});

export const RevealedCellsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [revealedCells, setRevealedCells] = useState<number>(0);

  const incrementRevealedCells = (): void => setRevealedCells(add(1));
  const resetRevealedCells = (): void => setRevealedCells(0);

  return (
    <RevealedCellsContext.Provider
      value={{ revealedCells, incrementRevealedCells, resetRevealedCells }}
    >
      {children}
    </RevealedCellsContext.Provider>
  );
};
