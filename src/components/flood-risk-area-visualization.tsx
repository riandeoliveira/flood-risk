"use client";

import { Icon } from "@/assets/icons";
import { floodRiskAreaStore } from "@/stores/flood-risk-area-store";
import { sideBarStore } from "@/stores/side-bar-store";
import { IconButton, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { ReactElement } from "react";

export const FloodRiskAreaVisualization = observer((): ReactElement => {
  const area = floodRiskAreaStore.current;

  if (!area) return <></>;

  return (
    <div className="animate-fade-in flex flex-col gap-12">
      <div className="flex justify-between">
        <h2 className="text-2xl text-center font-semibold">{area.nome}</h2>
        <Tooltip title="Adicionar nova área de risco">
          <IconButton
            onClick={() => sideBarStore.setActionType("READ_ALL")}
            className="w-8 h-8 rounded-full !bg-[#170C36]"
          >
            <Icon.ArrowBack className="text-white" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
});
