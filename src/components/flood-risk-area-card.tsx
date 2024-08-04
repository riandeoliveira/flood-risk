import { Icon } from "@/assets/icons";
import type { FindOneFloodRiskAreaResponse } from "@/features/find-one-flood-risk-area";
import { cn } from "@/utilities/cn";
import { IconButton, MenuItem, Tooltip } from "@mui/material";
import type { ReactElement } from "react";
import { Paper } from "./abstractions/paper";

type FloodRiskAreaCardProps = FindOneFloodRiskAreaResponse;

type RiskLevelType = keyof typeof riskLevels;

const riskLevels = {
  5: "border-red-400",
  4: "border-orange-400",
  3: "border-yellow-400",
  2: "border-blue-400",
  1: "border-green-400",
};

export const FloodRiskAreaCard = ({ nome, nivelRisco }: FloodRiskAreaCardProps): ReactElement => {
  const riskLevel = nivelRisco as RiskLevelType;

  return (
    <Paper className={cn("rounded-xl border-solid border-2", riskLevels[riskLevel])}>
      <div className="flex justify-between">
        <Tooltip title="Visualizar área de risco">
          <MenuItem onClick={() => {}} className="w-full">
            <span>{nome}</span>
          </MenuItem>
        </Tooltip>
        <div className={cn("flex gap-4 border-l-2 py-2 px-4 border-solid", riskLevels[riskLevel])}>
          <Tooltip title="Atualizar área de risco">
            <IconButton size="small" onClick={() => {}} className="!bg-blue-400">
              <Icon.Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remover área de risco">
            <IconButton size="small" onClick={() => {}} className="!bg-red-400">
              <Icon.Delete />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </Paper>
  );
};
