import { floodRiskApi } from "@/apis/flood-risk-api";
import type { ApiRequestReturnType } from "@/types/api";
import { withApiRequest } from "@/utilities/with-api-request";
import type { AxiosResponse } from "axios";

export type FindAllFloodRiskAreasResponse = {
  id: number;
  nome: string;
  descricao: string;
  estado: string;
  cidade: string;
  latitude: string;
  longitude: string;
  nivelRisco: number;
  historicoDados: string[];
};

type ReturnType = ApiRequestReturnType<FindAllFloodRiskAreasResponse[]>;

export const findAllFloodRiskAreas = withApiRequest(async (): ReturnType => {
  const response: AxiosResponse<FindAllFloodRiskAreasResponse[]> = await floodRiskApi.get(
    "/areas-riscos-alagamento",
  );

  return { data: response.data };
});
