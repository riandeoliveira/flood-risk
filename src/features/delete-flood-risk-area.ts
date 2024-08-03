import { floodRiskApi } from "@/apis/flood-risk-api";
import type { ApiRequestReturnType } from "@/types/api";
import { withApiRequest } from "@/utilities/with-api-request";
import type { AxiosResponse } from "axios";

type ReturnType = ApiRequestReturnType<void>;

export const DeleteFloodRiskArea = withApiRequest(async (id: number): ReturnType => {
  const response: AxiosResponse<void> = await floodRiskApi.delete(`/areas-riscos-enchente/${id}`);

  return { data: response.data };
});
