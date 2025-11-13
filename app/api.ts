import axios, { AxiosRequestConfig } from "axios";
import { useCallback } from "react";
import { Dispatch, SetStateAction } from "react";

type AxiosHookProps<T> = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setResponse: Dispatch<SetStateAction<T | null>>;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
};

export function useAxios<T>({
  setIsLoading,
  setResponse,
  setErrorMessage,
}: AxiosHookProps<T>) {
  const sendRequest = useCallback(
    async (config: AxiosRequestConfig) => {
      setIsLoading(true);
      try {
        const res = await axios(config);
        setResponse(res.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message || "Something went wrong. Try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setResponse, setErrorMessage]
  );

  return { sendRequest };
}
