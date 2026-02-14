import axios from "axios";
import { type TFunction } from "i18next";

export default function getErrorMessage(
  error: unknown,
  t: TFunction<"translation", undefined>,
): string {
  if (!axios.isAxiosError(error)) {
    return t("createTransactionError");
  }

  const errorMap: Record<number | string, string> = {
    400: t("invalidDataErrorMessage"),
    401: t("unauthorizedErrorMessage"),
    500: t("serverErrorMessage"),
  };

  const { response, code } = error;
  const status = response?.status;

  if (status && errorMap[status]) return errorMap[status];
  if (code && errorMap[code]) return errorMap[code];

  return t("createTransactionError");
}
