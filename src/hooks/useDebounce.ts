import { useEffect, useState } from "react";

const useDebounce = ({ search, delay }: { search: string; delay: number }) => {
  const [debouncedValue, setDebouncedValue] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [search, delay]);

  return debouncedValue;
};

export default useDebounce;
