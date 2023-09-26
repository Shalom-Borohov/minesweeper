import { Icon, Stack, Typography } from "@mui/material";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { FC } from "react";
import { CELL_WIDTH } from "../GameBoard/BoardCell/constants";
import { BOARD_WIDTH, BOMBS_AMOUNT } from "../GameBoard/constants";

export const FlagsAmountIndicator: FC = () => (
  <Stack direction="row" justifyContent="center">
    <Stack
      direction="row"
      width={CELL_WIDTH * BOARD_WIDTH}
      mb={1}
      alignItems="baseline"
    >
      <Icon fontSize="medium">
        <CrisisAlertIcon htmlColor="red" />
      </Icon>
      <Typography fontSize="x-large" fontWeight="400" ml={1} textAlign="start">
        {BOMBS_AMOUNT}
      </Typography>
    </Stack>
  </Stack>
);
