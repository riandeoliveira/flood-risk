import { brasilApi } from "@/apis/brasil-api";
import type { ApiRequestReturnType } from "@/types/api";
import type { AxiosResponse } from "axios";

export type FindAllBrazilianStatesResponse = {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
};

type ReturnType = ApiRequestReturnType<FindAllBrazilianStatesResponse[]>;

export const findAllBrazilianStates = async (): ReturnType => {
  try {
    const response: AxiosResponse<FindAllBrazilianStatesResponse[]> =
      await brasilApi.get("/ibge/uf/v1");

    return { data: response.data };
  } catch (error) {
    console.error(error);

    return { error: undefined };
  }
};
