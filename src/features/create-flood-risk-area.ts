import { floodRiskApi } from "@/apis/flood-risk-api";
import type { ApiRequestReturnType } from "@/types/api";
import { withApiRequest } from "@/utilities/with-api-request";
import type { AxiosResponse } from "axios";

export type CreateFloodRiskAreaRequest = {
  nome: string;
  descricao: string;
  estado: string;
  cidade: string;
  latitude: string;
  longitude: string;
  nivelRisco: number;
};

export type CreateFloodRiskAreaResponse = {
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

type ReturnType = ApiRequestReturnType<CreateFloodRiskAreaResponse>;

export const createFloodRiskArea = withApiRequest(
  async (request: CreateFloodRiskAreaRequest): ReturnType => {
    const response: AxiosResponse<CreateFloodRiskAreaResponse> = await floodRiskApi.post(
      "/areas-riscos-enchente",
      request,
    );

    return { data: response.data };
  },
);
