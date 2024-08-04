import { Icon } from "@/assets/icons";
import { floodRiskAreaStore } from "@/stores/flood-risk-area-store";
import { sideBarStore } from "@/stores/side-bar-store";
import { IconButton, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { ReactElement } from "react";
import { Button } from "./abstractions/button";

export const FloodRiskAreaDeletion = observer((): ReactElement => {
  const { nome, cidade, estado } = floodRiskAreaStore.current;

  const handleGoBack = (): void => {
    sideBarStore.setActionType("READ_ALL");
  };

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
          remover a área de risco <strong>{nome}</strong> localizada em <strong>{cidade}</strong>,{" "}
          <strong>{estado}</strong>?
        </p>
        <div className="flex justify-between">
          <Button onClick={handleGoBack}>Cancelar</Button>
          <Button color="error" onClick={() => {}}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
});
