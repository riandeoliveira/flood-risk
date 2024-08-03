import type { ApiProblemDetails } from "@/types/api";
import { AxiosError } from "axios";

/**
 * Wraps an API request function to handle errors gracefully, specifically targeting Axios errors.
 *
 * @param fn - An asynchronous function that performs an API request and returns a promise containing an object with optional `data` and `error` properties.
 * @returns A new asynchronous function that, when called, returns a promise containing an object with `data` or `error` properties.
 *
 * @example
 * // Define an API request function
 * const fetchData = async () => {
 *   const response = await axios.get('/api/data');
 *   return { data: response.data };
 * };
 *
 * // Wrap the function with error handling
 * const safeFetchData = withApiRequest(fetchData);
 *
 * // Use the wrapped function
 * safeFetchData().then(result => {
 *   if (result.error) {
 *     console.error('API error:', result.error);
 *   } else {
 *     console.log('Data:', result.data);
 *   }
 * });
 */
export const withApiRequest = <T>(
  fn: (...args: any[]) => Promise<{ data?: T; error?: ApiProblemDetails }>,
) => {
  return async (...args: any[]): Promise<{ data?: T; error?: ApiProblemDetails }> => {
    try {
      return await fn(...args);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<ApiProblemDetails>;

        return { error: response?.data };
      }

      return { error: undefined };
    }
  };
};
