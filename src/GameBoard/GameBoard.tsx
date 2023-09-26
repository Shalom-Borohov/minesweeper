import { Grid } from "@mui/material";
import { FC } from "react";
import { map } from "lodash/fp";
import { renderBoardRow } from "./functions";
import { GameBoardProps } from "./types";

export const GameBoard: FC<GameBoardProps> = ({ gameBoard, ...props }) => (
  <Grid container>{map(renderBoardRow(props), gameBoard)}</Grid>
);
