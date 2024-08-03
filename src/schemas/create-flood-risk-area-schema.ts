import { yupExtension } from "@/extensions/yup";

export const createFloodRiskAreaSchema = yupExtension.object({
  nome: yupExtension
    .string()
    .trim()
    .required("Campo obrigatório!")
    .max(255, "Máximo de 255 caracteres!"),

  descricao: yupExtension
    .string()
    .trim()
    .required("Campo obrigatório!")
    .max(255, "Máximo de 255 caracteres!"),

  estado: yupExtension
    .string()
    .trim()
    .required("Campo obrigatório!")
    .max(255, "Máximo de 255 caracteres!"),

  cidade: yupExtension
    .string()
    .trim()
    .required("Campo obrigatório!")
    .max(255, "Máximo de 255 caracteres!"),

  latitude: yupExtension
    .string()
    .trim()
    .required("Campo obrigatório!")
    .max(255, "Máximo de 255 caracteres!"),

  longitude: yupExtension
    .string()
    .trim()
    .required("Campo obrigatório!")
    .max(255, "Máximo de 255 caracteres!"),

  nivelRisco: yupExtension
    .number()
    .integer()
    .required("Campo obrigatório!")
    .min(1, "Mínimo de 1 número")
    .max(5, "Máximo de 5 números"),
});
