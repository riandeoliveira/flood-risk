"use client";

import { Icon } from "@/assets/icons";
import type { FindAllBrazilianCitiesByParamsResponse } from "@/features/find-all-brazilian-cities-by-params";
import { findAllBrazilianCitiesByParams } from "@/features/find-all-brazilian-cities-by-params";
import type { FindAllBrazilianStatesResponse } from "@/features/find-all-brazilian-states";
import { findAllBrazilianStates } from "@/features/find-all-brazilian-states";
import { createFloodRiskAreaSchema } from "@/schemas/create-flood-risk-area-schema";
import { sideBarStore } from "@/stores/side-bar-store";
import { IconButton, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState, type ReactElement } from "react";
import { Button } from "./abstractions/button";
import { Form } from "./abstractions/form";
import { Input } from "./abstractions/input";
import { Select } from "./abstractions/select";

export const FloodRiskAreaCreationForm = observer((): ReactElement => {
  const [brazilianStates, setBrazilianStates] = useState<FindAllBrazilianStatesResponse[]>([]);
  const [brazilianCities, setBrazilianCities] = useState<FindAllBrazilianCitiesByParamsResponse[]>(
    [],
  );

  const riskLevels = [
    { label: "5. Muito alto", value: 5 },
    { label: "4. Alto", value: 4 },
    { label: "3. Médio", value: 3 },
    { label: "2. Baixo", value: 2 },
    { label: "1. Muito baixo", value: 1 },
  ];

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
    onSubmit: (values: any) => {
      console.log(values);
    },
  });

  const handleFetchBrazilianStates = useCallback(async () => {
    const { data } = await findAllBrazilianStates();

    if (data) setBrazilianStates(data);
  }, []);

  const handleFetchBrazilianCities = useCallback(async (uf: string) => {
    const { data } = await findAllBrazilianCitiesByParams(uf);

    if (data) setBrazilianCities(data);
  }, []);

  useEffect(() => {
    handleFetchBrazilianStates();
  }, []);

  return (
    <div className="animate-fade-in flex flex-col gap-12">
      <div className="flex justify-between">
        <h2 className="text-2xl text-center font-semibold">Nova Área de Risco</h2>
        <Tooltip title="Voltar">
          <IconButton
            onClick={() => sideBarStore.setActionType("READ_ALL")}
            className="w-8 h-8 rounded-full !bg-[#170C36]"
          >
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
        <Select
          name="nivelRisco"
          label="Nível de risco:*"
          options={riskLevels.map((level) => level.label)}
          value={formik.values.nivelRisco}
          onSelect={(_, riskLevel) => {
            const level = riskLevels.find((level) => level.label === riskLevel);

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
