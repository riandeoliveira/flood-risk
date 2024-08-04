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
    <Paper className="rounded-xl">
      <div className="flex justify-between">
        {/* <Tooltip title="Visualizar área de risco"> */}
        <MenuItem onClick={handleFloodAreaClick} className="w-full !pl-0 !py-0">
          <div
            style={{ backgroundColor: riskLevelColor }}
            className="h-full flex items-center p-2 rounded-l-[4px] mr-4"
          >
            <Icon.WarningAmber className="text-white" />
          </div>
          <span>
            {props.nome} | {props.cidade}
          </span>
        </MenuItem>
        {/* </Tooltip> */}
        <div className="flex gap-3 p-2">
          {/* <Tooltip title="Atualizar área de risco"> */}
          <IconButton size="small" onClick={() => {}} className="!bg-blue-500">
            <Icon.Edit fontSize="small" className="text-white" />
          </IconButton>
          {/* </Tooltip> */}
          {/* <Tooltip title="Remover área de risco"> */}
          <IconButton size="small" onClick={() => {}} className="!bg-red-500">
            <Icon.Delete fontSize="small" className="text-white" />
          </IconButton>
          {/* </Tooltip> */}
        </div>
      </div>
    </Paper>
  );
});
