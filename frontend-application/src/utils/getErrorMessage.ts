import axios from "axios";

export default function getErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return "Erro ao criar transação. Tente novamente.";
  }

  const errorMap: Record<number | string, string> = {
    400: "Dados inválidos. Verifique as informações.",
    401: "Não autorizado. Verifique suas credenciais.",
    500: "Erro no servidor. Tente novamente mais tarde.",
  };

  const { response, code } = error;
  const status = response?.status;

  if (status && errorMap[status]) return errorMap[status];
  if (code && errorMap[code]) return errorMap[code];
  if (!response) return errorMap["NO_RESPONSE"];

  return `Erro ao criar a transação: ${error.message}`;
}
