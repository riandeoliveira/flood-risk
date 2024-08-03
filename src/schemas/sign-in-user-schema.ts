import { yupExtension } from "@/extensions/yup";

export const signInUserSchema = yupExtension.object({
  email: yupExtension
    .string()
    .trim()
    .required("Campo obrigatório!")
    .validEmail("O e-mail deve ser válido!")
    .max(64, "Máximo de 64 caracteres!"),

  password: yupExtension
    .string()
    .trim()
    .required("Campo obrigatório!")
    .max(64, "Máximo de 64 caracteres!"),
});
