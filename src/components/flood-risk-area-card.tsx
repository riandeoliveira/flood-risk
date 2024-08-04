import { Icon } from "@/assets/icons";
import { floodRiskLevels } from "@/constants/flood-risk-levels";
import type { FindOneFloodRiskAreaResponse } from "@/features/find-one-flood-risk-area";
import { floodRiskAreaStore } from "@/stores/flood-risk-area-store";
import { sideBarStore } from "@/stores/side-bar-store";
import { IconButton, MenuItem } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { ReactElement } from "react";
import { Paper } from "./abstractions/paper";

type FloodRiskAreaCardProps = FindOneFloodRiskAreaResponse;

export const FloodRiskAreaCard = observer((props: FloodRiskAreaCardProps): ReactElement => {
  const riskLevelColor = floodRiskLevels.find((risk) => risk.value === props.nivelRisco)?.color;

  const handleFloodAreaClick = (): void => {
    floodRiskAreaStore.setCurrent(props);

    if (sideBarStore.actionType !== "READ_ONE") sideBarStore.setActionType("READ_ONE");
  };

  return (
    <Paper style={{ borderColor: riskLevelColor }} className="rounded-xl border-solid border-2">
      <div className="flex justify-between">
        {/* <Tooltip title="Visualizar área de risco"> */}
        <MenuItem onClick={handleFloodAreaClick} className="w-full">
          <span>
            {props.nome} | {props.cidade}
          </span>
        </MenuItem>
        {/* </Tooltip> */}
        <div
          style={{ borderColor: riskLevelColor }}
          className="flex gap-4 border-l-2 py-2 px-4 border-solid"
        >
          {/* <Tooltip title="Atualizar área de risco"> */}
          <IconButton size="small" onClick={() => {}} className="!bg-blue-400">
            <Icon.Edit />
          </IconButton>
          {/* </Tooltip> */}
          {/* <Tooltip title="Remover área de risco"> */}
          <IconButton size="small" onClick={() => {}} className="!bg-red-400">
            <Icon.Delete />
          </IconButton>
          {/* </Tooltip> */}
        </div>
      </div>
    </Paper>
  );
});
