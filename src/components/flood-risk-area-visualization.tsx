"use client";

import { Icon } from "@/assets/icons";
import { floodRiskLevels } from "@/constants/flood-risk-levels";
import type { FindOneFloodRiskAreaResponse } from "@/features/find-one-flood-risk-area";
import { findOneFloodRiskArea } from "@/features/find-one-flood-risk-area";
import { floodRiskAreaStore } from "@/stores/flood-risk-area-store";
import { sideBarStore } from "@/stores/side-bar-store";
import { IconButton, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState, type ReactElement } from "react";

export const FloodRiskAreaVisualization = observer((): ReactElement => {
  const [floodRiskArea, setFloodRiskArea] = useState<FindOneFloodRiskAreaResponse>(
    {} as FindOneFloodRiskAreaResponse,
  );

  const risk = floodRiskLevels.find((risk) => risk.value === floodRiskArea.nivelRisco);

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
        <h2 className="text-2xl text-center font-semibold">{floodRiskArea.nome}</h2>
        <Tooltip title="Voltar">
          <IconButton
            onClick={() => sideBarStore.setActionType("READ_ALL")}
            className="w-8 h-8 rounded-full !bg-[#170C36]"
          >
            <Icon.ArrowBack className="text-white" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="font-semibold text-xl mb-2">Descrição</h3>
          <p className="text-justify">{floodRiskArea.descricao}</p>
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-2">Localização</h3>
          <ul>
            <li>
              <strong>Estado:</strong> <span>{floodRiskArea.estado}</span>
            </li>
            <li>
              <strong>Cidade:</strong> <span>{floodRiskArea.cidade}</span>
            </li>
            <li>
              <strong>Latitude:</strong> <span>{floodRiskArea.latitude}</span>
            </li>
            <li>
              <strong>Longitude:</strong> <span>{floodRiskArea.longitude}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-2">Nível de Risco</h3>
          <strong style={{ color: risk?.color }} className="text-xl">
            {risk?.label}
          </strong>
        </div>
        {/* <div>
          <h3 className="font-semibold text-xl mb-2">Fontes</h3>
          {historicoDados.map((dados, index) => (
            <Link
              href={dados}
              target="_blank"
              className="text-justify text-blue-400 underline hover:text-blue-600 transition-colors"
              key={index}
            >
              {dados}
            </Link>
          ))}
        </div> */}
      </div>
    </div>
  );
});
