"use client";

import { Icon } from "@/assets/icons";
import { floodRiskLevels } from "@/constants/flood-risk-levels";
import type { CreateFloodRiskAreaRequest } from "@/features/create-flood-risk-area";
import { createFloodRiskArea } from "@/features/create-flood-risk-area";
import type { FindAllBrazilianCitiesByParamsResponse } from "@/features/find-all-brazilian-cities-by-params";
import { findAllBrazilianCitiesByParams } from "@/features/find-all-brazilian-cities-by-params";
import type { FindAllBrazilianStatesResponse } from "@/features/find-all-brazilian-states";
import { findAllBrazilianStates } from "@/features/find-all-brazilian-states";
import { findAllFloodRiskAreas } from "@/features/find-all-flood-risk-areas";
import { createFloodRiskAreaSchema } from "@/schemas/create-flood-risk-area-schema";
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

type CreateFloodRiskAreaRequestForm = Omit<CreateFloodRiskAreaRequest, "nivelRisco"> & {
  nivelRisco: number | null;
};

export const FloodRiskAreaCreationForm = observer((): ReactElement => {
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

  const handleCreateFloodRiskArea = async (
    values: CreateFloodRiskAreaRequestForm,
  ): Promise<void> => {
    const request: CreateFloodRiskAreaRequest = {
      ...values,
      nivelRisco: values.nivelRisco ?? 0,
    };

    loadingStore.wait();

    const response = await createFloodRiskArea(request);

    loadingStore.stop();

    if (response.status === 201) {
      toast.success("Área de risco criada com sucesso!");

      handleFetchAllFloodRiskAreas();
      handleGoBack();
    } else toast.error("Erro: Não foi possível criar uma área de risco!");
  };

  const formik = useFormik({
    initialValues: {
      nome: "",
      descricao: "",
      estado: "",
      cidade: "",
      latitude: "",
      longitude: "",
      nivelRisco: null,
    },
    validationSchema: createFloodRiskAreaSchema,
    onSubmit: handleCreateFloodRiskArea,
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

  useEffect(() => {
    handleFetchBrazilianStates();
  }, []);

  return (
    <div className="animate-fade-in flex flex-col gap-12">
      <div className="flex justify-between">
        <h2 data-test-id="side-bar-title" className="text-2xl text-center font-semibold">
          Nova Área de Risco
        </h2>
        <Tooltip title="Voltar">
          <IconButton onClick={handleGoBack} className="w-8 h-8 rounded-full !bg-[#170C36]">
            <Icon.ArrowBack className="text-white" />
          </IconButton>
        </Tooltip>
      </div>
      <Form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Input
          name="nome"
          label="Nome:*"
          placeholder="Nome da área de risco"
          instance={formik}
          inputProps={{ "data-test-id": "nome-input" }}
        />
        <Input
          name="descricao"
          label="Descrição:*"
          placeholder="Descrição da área de risco"
          multiline
          rows={2}
          instance={formik}
          inputProps={{ "data-test-id": "descricao-input" }}
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
            dataTestId="estado-input"
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
              dataTestId="cidade-input"
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
            inputProps={{ "data-test-id": "latitude-input" }}
          />
          <Input
            type="number"
            name="longitude"
            label="Longitude:*"
            placeholder="Longitude da área de risco"
            instance={formik}
            inputProps={{ "data-test-id": "longitude-input" }}
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
          dataTestId="nivel-risco-input"
          instance={formik}
        />
        <Button type="submit" data-test-id="submit-button" className="!mt-4">
          Enviar
        </Button>
      </Form>
    </div>
  );
});
