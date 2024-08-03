export type ApiErrorResponse<TError> = {
  data?: undefined;
  error: TError;
};

export type ApiProblemDetails = {
  detail: string;
  instance?: string;
  status: number;
  title: string;
  type?: string;
};

type ApiRequestReturnType<TResponse> = Promise<{
  data?: TResponse;
  error?: ApiProblemDetails;
}>;

export type ApiSuccessResponse<TData> = {
  data: TData;
  error?: undefined;
};
