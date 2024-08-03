import { brasilApi } from "@/apis/ibge-govbr-api";
import type { ApiRequestReturnType } from "@/types/api";
import type { AxiosResponse } from "axios";

export type FindAllBrazilianCitiesByParamsResponse = {
  nome: string
  codigo_ibge: string
};

type ReturnType = ApiRequestReturnType<FindAllBrazilianCitiesByParamsResponse[]>;

export const findAllBrazilianCitiesByParams = async (uf: string): ReturnType => {
  try {
    const response: AxiosResponse<FindAllBrazilianCitiesByParamsResponse[]> = await brasilApi.get(
      `/ibge/municipios/v1/${uf}?providers=dados-abertos-br,gov,wikipedia`,
    );

    return { data: response.data };
  } catch (error) {
    console.error(error);

    return { error: undefined };
  }
};
