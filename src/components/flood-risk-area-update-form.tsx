"use client";

import { Icon } from "@/assets/icons";
import { floodRiskLevels } from "@/constants/flood-risk-levels";
import type { FindAllBrazilianCitiesByParamsResponse } from "@/features/find-all-brazilian-cities-by-params";
import { findAllBrazilianCitiesByParams } from "@/features/find-all-brazilian-cities-by-params";
import type { FindAllBrazilianStatesResponse } from "@/features/find-all-brazilian-states";
import { findAllBrazilianStates } from "@/features/find-all-brazilian-states";
import { findAllFloodRiskAreas } from "@/features/find-all-flood-risk-areas";
import { findOneFloodRiskArea } from "@/features/find-one-flood-risk-area";
import type { UpdateFloodRiskAreaRequest } from "@/features/update-flood-risk-area";
import { updateFloodRiskArea } from "@/features/update-flood-risk-area";
import { updateFloodRiskAreaSchema } from "@/schemas/update-flood-risk-area-schema";
import { floodRiskAreaStore } from "@/stores/flood-risk-area-store";
import { loadingStore } from "@/stores/loading-store";
import { sideBarStore } from "@/stores/side-bar-store";
import { IconButton, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState, type ReactElement } from "react";
import { toast } from "react-toastify";
import { Button } from "./abstractions/button";
import { Form } from "./abstractions/form";
import { Input } from "./abstractions/input";
import { Select } from "./abstractions/select";

type UpdateFloodRiskAreaRequestForm = Omit<UpdateFloodRiskAreaRequest, "nivelRisco"> & {
  nivelRisco: number | null;
};

export const FloodRiskAreaUpdateForm = observer((): ReactElement => {
  const [brazilianStates, setBrazilianStates] = useState<FindAllBrazilianStatesResponse[]>([]);
  const [brazilianCities, setBrazilianCities] = useState<FindAllBrazilianCitiesByParamsResponse[]>(
    [],
  );

  const handleFetchAllFloodRiskAreas = useCallback(async () => {
    loadingStore.wait();

    const { data } = await findAllFloodRiskAreas();

    loadingStore.stop();

    if (data) floodRiskAreaStore.setList(data);
  }, []);

  const handleGoBack = (): void => sideBarStore.setActionType("READ_ALL");

  const handleUpdateFloodRiskArea = async (
    values: UpdateFloodRiskAreaRequestForm,
  ): Promise<void> => {
    const request: UpdateFloodRiskAreaRequest = {
      ...values,
      nivelRisco: values.nivelRisco ?? 0,
    };

    loadingStore.wait();

    const response = await updateFloodRiskArea(request);

    loadingStore.stop();

    if (response.status === 200) {
      toast.success("Área de risco atualizada com sucesso!");

      handleFetchAllFloodRiskAreas();
      handleGoBack();
    } else toast.error("Erro: Não foi possível atualizar esta área de risco!");
  };

  const formik = useFormik({
    initialValues: {
      id: 0,
      nome: "",
      descricao: "",
      estado: "",
      cidade: "",
      latitude: "",
      longitude: "",
      nivelRisco: null,
    },
    validationSchema: updateFloodRiskAreaSchema,
    onSubmit: handleUpdateFloodRiskArea,
  });

  const handleFetchBrazilianStates = useCallback(async () => {
    loadingStore.wait();

    const { data } = await findAllBrazilianStates();

    loadingStore.stop();

    if (data) setBrazilianStates(data);
  }, []);

  const handleFetchBrazilianCities = useCallback(async (uf: string) => {
    loadingStore.wait();

    const { data } = await findAllBrazilianCitiesByParams(uf);

    loadingStore.stop();

    if (data) setBrazilianCities(data);
  }, []);

  const handleFetchFloodRiskArea = useCallback(async () => {
    const { data } = await findOneFloodRiskArea(floodRiskAreaStore.currentId);

    if (data) {
      Object.keys(data).forEach((key) => {
        const field = key as keyof typeof data;
        const value = data[field];

        formik.setFieldValue(field, value);
      });
    }
  }, [floodRiskAreaStore.currentId]);

  useEffect(() => {
    handleFetchFloodRiskArea();
  }, [handleFetchFloodRiskArea]);

  useEffect(() => {
    handleFetchBrazilianStates();
  }, []);

  return (
    <div className="animate-fade-in flex flex-col gap-12">
      <div className="flex justify-between">
        <h2 className="text-2xl text-center font-semibold">Atualizar Área de Risco</h2>
        <Tooltip title="Voltar">
          <IconButton onClick={handleGoBack} className="w-8 h-8 rounded-full !bg-[#170C36]">
            <Icon.ArrowBack className="text-white" />
          </IconButton>
        </Tooltip>
      </div>
      <Form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Input name="nome" label="Nome:*" placeholder="Nome da área de risco" instance={formik} />
        <Input
          name="descricao"
          label="Descrição:*"
          placeholder="Descrição da área de risco"
          multiline
          rows={2}
          instance={formik}
        />
        <div className="flex gap-4">
          <Select
            name="estado"
            label="Estado:*"
            options={brazilianStates.map((state) => state.nome)}
            value={formik.values.estado}
            onSelect={(_, stateName) => {
              formik.setFieldValue("estado", stateName);

              const state = brazilianStates.find((state) => state.nome === stateName);

              handleFetchBrazilianCities(state?.sigla as string);
            }}
            instance={formik}
          />
          {formik.values.estado !== "" && (
            <Select
              name="cidade"
              label="Cidade:*"
              options={brazilianCities.map((city) => city.nome)}
              value={formik.values.cidade}
              onSelect={(_, cityName) => {
                formik.setFieldValue("cidade", cityName);
              }}
              instance={formik}
            />
          )}
        </div>
        <div className="flex gap-4">
          <Input
            type="number"
            name="latitude"
            label="Latitude:*"
            placeholder="Latitude da área de risco"
            instance={formik}
          />
          <Input
            type="number"
            name="longitude"
            label="Longitude:*"
            placeholder="Longitude da área de risco"
            instance={formik}
          />
        </div>
        <Select
          name="nivelRisco"
          label="Nível de risco:*"
          options={floodRiskLevels.map((level) => level.label)}
          value={formik.values.nivelRisco}
          onSelect={(_, riskLevel) => {
            const level = floodRiskLevels.find((level) => level.label === riskLevel);

            formik.setFieldValue("nivelRisco", level?.value);
          }}
          instance={formik}
        />
        <Button type="submit" className="!mt-4">
          Enviar
        </Button>
      </Form>
    </div>
  );
});
