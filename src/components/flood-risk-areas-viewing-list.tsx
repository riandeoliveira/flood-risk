"use client";

import { Icon } from "@/assets/icons";
import type { FindAllFloodRiskAreasResponse } from "@/features/find-all-flood-risk-areas";
import { findAllFloodRiskAreas } from "@/features/find-all-flood-risk-areas";
import { sideBarStore } from "@/stores/side-bar-store";
import { IconButton, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState, type ReactElement } from "react";
import { FloodRiskAreaCard } from "./flood-risk-area-card";

export const FloodRiskAreasViewingList = observer((): ReactElement => {
  const [floodRiskAreas, setFloodRiskAreas] = useState<FindAllFloodRiskAreasResponse[]>([]);

  const handleFetchAllFloodRiskAreas = useCallback(async () => {
    const { data } = await findAllFloodRiskAreas();

    if (data) setFloodRiskAreas(data);
  }, []);

  useEffect(() => {
    handleFetchAllFloodRiskAreas();
  }, []);

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
        {floodRiskAreas.map((area) => (
          <FloodRiskAreaCard {...area} key={area.id} />
        ))}
      </div>
    </div>
  );
});
