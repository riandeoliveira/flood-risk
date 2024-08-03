import { REGEX } from "@/constants/regex";
import * as yup from "yup";

declare module "yup" {
  interface StringSchema {
    validEmail(message: string): StringSchema;
  }
}

yup.addMethod(yup.string, "validEmail", function (message: string) {
  return this.matches(REGEX.VALID_EMAIL, message);
});

export const yupExtension = yup;
