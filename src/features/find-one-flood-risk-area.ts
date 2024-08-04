import { floodRiskApi } from "@/apis/flood-risk-api";
import type { ApiRequestReturnType } from "@/types/api";
import { withApiRequest } from "@/utilities/with-api-request";
import type { AxiosResponse } from "axios";

export type FindOneFloodRiskAreaResponse = {
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

type ReturnType = ApiRequestReturnType<FindOneFloodRiskAreaResponse>;

export const findOneFloodRiskArea = withApiRequest(async (id: number): ReturnType => {
  const response: AxiosResponse<FindOneFloodRiskAreaResponse> = await floodRiskApi.get(
    `/areas-riscos-enchente/${id}`,
  );

  return { data: response.data };
});
