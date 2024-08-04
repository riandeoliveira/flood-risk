import { floodRiskApi } from "@/apis/flood-risk-api";
import type { ApiRequestReturnType } from "@/types/api";
import { withApiRequest } from "@/utilities/with-api-request";
import type { AxiosResponse } from "axios";

export type UpdateFloodRiskAreaRequest = {
  nome: string;
  descricao: string;
  estado: string;
  cidade: string;
  latitude: string;
  longitude: string;
  nivelRisco: number;
};

export type UpdateFloodRiskAreaResponse = {
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

type ReturnType = ApiRequestReturnType<UpdateFloodRiskAreaResponse[]>;

export const updateFloodRiskArea = withApiRequest(
  async (id: number, request: UpdateFloodRiskAreaRequest): ReturnType => {
    const response: AxiosResponse<UpdateFloodRiskAreaResponse[]> = await floodRiskApi.put(
      `/areas-riscos-enchente/${id}`,
      request,
    );

    return { data: response.data };
  },
);
