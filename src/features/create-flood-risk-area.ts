import { floodRiskApi } from "@/apis/flood-risk-api";
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

type ReturnType = Promise<AxiosResponse<CreateFloodRiskAreaResponse>>;

export const createFloodRiskArea = async (request: CreateFloodRiskAreaRequest): ReturnType => {
  const response: AxiosResponse<CreateFloodRiskAreaResponse> = await floodRiskApi.post(
    "/areas-riscos-alagamento",
    request,
  );

  return response;
};
