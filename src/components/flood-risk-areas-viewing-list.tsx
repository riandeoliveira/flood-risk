"use client";

import { Icon } from "@/assets/icons";
import type { FindAllFloodRiskAreasResponse } from "@/features/find-all-flood-risk-areas";
import { findAllFloodRiskAreas } from "@/features/find-all-flood-risk-areas";
import { floodRiskAreaStore } from "@/stores/flood-risk-area-store";
import { sideBarStore } from "@/stores/side-bar-store";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState, type ReactElement } from "react";
import { FloodRiskAreaCard } from "./flood-risk-area-card";

export const FloodRiskAreasViewingList = observer((): ReactElement => {
  const [allFloodRiskAreas, setAllFloodRiskAreas] = useState<FindAllFloodRiskAreasResponse[]>([]);
  const [filteredFloodRiskAreas, setFilteredFloodRiskAreas] = useState<
    FindAllFloodRiskAreasResponse[]
  >([]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const searchTerm = event.target.value.toLowerCase();

    const filteredList = allFloodRiskAreas.filter(
      (area) =>
        area.nome.toLowerCase().includes(searchTerm) ||
        area.cidade.toLowerCase().includes(searchTerm),
    );

    setFilteredFloodRiskAreas(filteredList);
  };

  const handleFetchAllFloodRiskAreas = useCallback(async () => {
    const { data } = await findAllFloodRiskAreas();

    if (data) {
      setAllFloodRiskAreas(data);
      setFilteredFloodRiskAreas(data);
    }
  }, []);

  useEffect(() => {
    handleFetchAllFloodRiskAreas();
  }, [handleFetchAllFloodRiskAreas]);

  useEffect(() => {
    floodRiskAreaStore.setCurrentId(0);
  }, []);

  return (
    <div className="animate-fade-in flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Áreas de Risco de Alagamentos</h2>
          <Tooltip title="Adicionar nova área de risco">
            <IconButton
              onClick={() => sideBarStore.setActionType("CREATE")}
              className="w-8 h-8 rounded-full !bg-[#170C36]"
            >
              <Icon.Add className="text-white" />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <TextField
            label="Pesquisar uma área"
            placeholder="Pesquise uma área pelo nome ou cidade"
            size="small"
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {filteredFloodRiskAreas.length > 0 ? (
          filteredFloodRiskAreas.map((area) => <FloodRiskAreaCard {...area} key={area.id} />)
        ) : (
          <span className="text-center text-zinc-500">Nenhuma área de risco encontrada</span>
        )}
      </div>
    </div>
  );
});
