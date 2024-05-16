import { useQuery } from "@tanstack/react-query";
import { getCountries } from "./services";

const QUERY_KEYS = {
  COUNTRIES: "countries",
};

export const useCountries = ({ enabled = true }: { enabled?: boolean }) =>
  useQuery({
    queryKey: [QUERY_KEYS.COUNTRIES],
    queryFn: getCountries,
    enabled,
  });
