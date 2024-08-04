"use client";

import { Icon } from "@/assets/icons";
import { deleteFloodRiskArea } from "@/features/delete-flood-risk-area";
import type { FindOneFloodRiskAreaResponse } from "@/features/find-one-flood-risk-area";
import { findOneFloodRiskArea } from "@/features/find-one-flood-risk-area";
import { floodRiskAreaStore } from "@/stores/flood-risk-area-store";
import { sideBarStore } from "@/stores/side-bar-store";
import { IconButton, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState, type ReactElement } from "react";
import { Button } from "./abstractions/button";

export const FloodRiskAreaDeletion = observer((): ReactElement => {
  const [floodRiskArea, setFloodRiskArea] = useState<FindOneFloodRiskAreaResponse>(
    {} as FindOneFloodRiskAreaResponse,
  );

  const handleGoBack = (): void => {
    sideBarStore.setActionType("READ_ALL");
  };

  const handleDeleteFloodRiskArea = useCallback(async () => {
    await deleteFloodRiskArea(floodRiskAreaStore.currentId);
  }, []);

  const handleFetchFloodRiskArea = useCallback(async () => {
    const { data } = await findOneFloodRiskArea(floodRiskAreaStore.currentId);

    if (data) setFloodRiskArea(data);
  }, [floodRiskAreaStore.currentId]);

  useEffect(() => {
    handleFetchFloodRiskArea();
  }, [handleFetchFloodRiskArea]);

  return (
    <div className="animate-fade-in flex flex-col gap-12">
      <div className="flex justify-between">
        <h2 className="text-2xl text-center font-semibold">Remover Área de Risco</h2>
        <Tooltip title="Voltar">
          <IconButton onClick={handleGoBack} className="w-8 h-8 rounded-full !bg-[#170C36]">
            <Icon.ArrowBack className="text-white" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="flex flex-col gap-12">
        <p className="text-justify">
          <span className="text-red-500 font-semibold">AVISO:</span> Você tem certeza que deseja
          remover a área de risco <strong>{floodRiskArea.nome}</strong> localizada em{" "}
          <strong>{floodRiskArea.cidade}</strong>, <strong>{floodRiskArea.estado}</strong>?
        </p>
        <div className="flex justify-between">
          <Button onClick={handleGoBack}>Cancelar</Button>
          <Button color="error" onClick={handleDeleteFloodRiskArea}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
});
