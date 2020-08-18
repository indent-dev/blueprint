import React from "react";
import Request from "./Request";
import useSWR from "swr";

const apiURL = process.env.REACT_APP_API_URL;

const useRequest = <T>(path: string) => {
  const request = React.useMemo(() => {
    return new Request(apiURL || "");
  }, []);

  const { error: errorValidate, ...rest } = useSWR<T>(path, () =>
    request.get<T>(path).then(data => data)
  );

  const [errorMutate, setErrorMutate] = React.useState<string>();
  const [isMutating, setMutating] = React.useState<boolean>(false);

  const mutate = React.useCallback(
    async (mutateRequest: () => Promise<T>) => {
      try {
        setMutating(true);
        const mutatedData = await mutateRequest();
        await rest.mutate(mutatedData, false);
      } catch (error) {
        setErrorMutate(error.message);
        throw error;
      } finally {
        setMutating(false);
      }
    },
    [rest]
  );

  return { ...rest, errorValidate, mutate, errorMutate, isMutating, request };
};

export default useRequest;
