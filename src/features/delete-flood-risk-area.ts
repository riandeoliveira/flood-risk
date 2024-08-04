import { floodRiskApi } from "@/apis/flood-risk-api";
import type { AxiosResponse } from "axios";

export const deleteFloodRiskArea = async (id: number): Promise<AxiosResponse<void>> => {
  const response: AxiosResponse<void> = await floodRiskApi.delete(`/areas-riscos-alagamento/${id}`);

  return response;
};
