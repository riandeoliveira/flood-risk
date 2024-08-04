import { floodRiskApi } from "@/apis/flood-risk-api";
import type { AxiosResponse } from "axios";

export type UpdateFloodRiskAreaRequest = {
  id: number;
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

type ReturnType = Promise<AxiosResponse<UpdateFloodRiskAreaResponse[]>>;

export const updateFloodRiskArea = async (request: UpdateFloodRiskAreaRequest): ReturnType => {
  const { id, ...body } = request;

  const response: AxiosResponse<UpdateFloodRiskAreaResponse[]> = await floodRiskApi.put(
    `/areas-riscos-alagamento/${id}`,
    body,
  );

  return response;
};
