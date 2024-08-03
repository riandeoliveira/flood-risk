import { Icon } from "@/assets/icons";
import { cn } from "@/utilities/cn";
import { IconButton, MenuItem, Tooltip } from "@mui/material";
import type { ReactElement } from "react";
import { Paper } from "./abstractions/paper";

type FloodRiskAreaCardProps = {
  border: string;
};

export const FloodRiskAreaCard = ({ border }: FloodRiskAreaCardProps): ReactElement => {
  return (
    <Paper className={cn("rounded-xl border-solid border-2", border)}>
      <div className="flex justify-between">
        <Tooltip title="Visualizar área de risco">
          <MenuItem onClick={() => {}} className="w-full">
            <span>Ilha das Flores</span>
          </MenuItem>
        </Tooltip>
        <div className={cn("flex gap-4 border-l-2 py-2 px-4 border-solid", border)}>
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
