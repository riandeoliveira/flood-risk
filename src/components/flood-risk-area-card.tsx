"use client";

import { Icon } from "@/assets/icons";
import { floodRiskLevels } from "@/constants/flood-risk-levels";
import { type FindOneFloodRiskAreaResponse } from "@/features/find-one-flood-risk-area";
import { floodRiskAreaStore } from "@/stores/flood-risk-area-store";
import { sideBarStore } from "@/stores/side-bar-store";
import { IconButton, MenuItem } from "@mui/material";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { type ReactElement } from "react";
import { Paper } from "./abstractions/paper";

type FloodRiskAreaCardProps = FindOneFloodRiskAreaResponse;

export const FloodRiskAreaCard = observer((props: FloodRiskAreaCardProps): ReactElement => {
  const riskLevelColor = floodRiskLevels.find((risk) => risk.value === props.nivelRisco)?.color;

  const handleFloodRiskAreaClick = (): void => {
    floodRiskAreaStore.setCurrentId(props.id);

    if (sideBarStore.actionType !== "READ_ONE") sideBarStore.setActionType("READ_ONE");
  };

  const handleFloodRiskAreaDelete = (): void => {
    floodRiskAreaStore.setCurrentId(props.id);

    if (sideBarStore.actionType !== "DELETE") sideBarStore.setActionType("DELETE");
  };

  const cardInfo: string = `${props.nome} | ${props.cidade}`;

  return (
    <Paper className="rounded-xl">
      <div className="flex justify-between">
        <MenuItem onClick={handleFloodRiskAreaClick} className="w-full !p-0 !py-0">
          <div
            style={{ backgroundColor: riskLevelColor }}
            className="h-full flex items-center p-2 rounded-l-[4px] mr-4"
          >
            <Icon.WarningAmber className="text-white" />
          </div>
          <span className="truncate">{_.truncate(cardInfo, { length: 32 })}</span>
        </MenuItem>
        <div className="flex gap-3 p-2 s-600px:hidden">
          <IconButton size="small" onClick={() => {}} className="!bg-blue-500">
            <Icon.Edit fontSize="small" className="text-white" />
          </IconButton>
          <IconButton size="small" onClick={handleFloodRiskAreaDelete} className="!bg-red-500">
            <Icon.Delete fontSize="small" className="text-white" />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
});
