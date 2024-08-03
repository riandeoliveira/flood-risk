"use client";

import { Icon } from "@/assets/icons";
import { sideBarStore } from "@/stores/side-bar-store";
import { IconButton, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { ReactElement } from "react";
import { FloodRiskAreaCard } from "./flood-risk-area-card";

export const FloodRiskAreasVisualization = observer((): ReactElement => {
  return (
    <div className="animate-fade-in flex flex-col gap-12">
      <div className="flex justify-between">
        <h2 className="text-2xl text-center font-semibold">Áreas de Risco de Enchentes</h2>
        <Tooltip title="Adicionar nova área de risco">
          <IconButton
            onClick={() => sideBarStore.setActionType("CREATE")}
            className="w-8 h-8 rounded-full !bg-[#170C36]"
          >
            <Icon.Add className="text-white" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="flex flex-col gap-8">
        <FloodRiskAreaCard border="border-red-400" />
        <FloodRiskAreaCard border="border-orange-400" />
        <FloodRiskAreaCard border="border-yellow-400" />
        <FloodRiskAreaCard border="border-blue-400" />
        <FloodRiskAreaCard border="border-green-400" />
      </div>
    </div>
  );
});
