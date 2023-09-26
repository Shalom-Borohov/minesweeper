import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useContext } from "react";
import { TITLE, TOOLTIP_TITLE } from "./constants";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { NavbarProps } from "./types";
import { RevealedCellsContextValue } from "../context/types";
import { RevealedCellsContext } from "../context";
import { over } from "lodash/fp";

export const Navbar: FC<NavbarProps> = ({ resetGameBoard }) => {
  const { resetRevealedCells } =
    useContext<RevealedCellsContextValue>(RevealedCellsContext);

  return (
    <AppBar>
      <Toolbar disableGutters sx={{ width: "inherit" }}>
        <Stack
          width="inherit"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mx={2}
        >
          <Tooltip title={TOOLTIP_TITLE}>
            <IconButton
              sx={{ ":focus": { outline: 0 } }}
              onClick={over([resetGameBoard, resetRevealedCells])}
            >
              <RestartAltIcon fontSize="large" htmlColor="white" />
            </IconButton>
          </Tooltip>
          <Typography variant="h3">{TITLE}</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
