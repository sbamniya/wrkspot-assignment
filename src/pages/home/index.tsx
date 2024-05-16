import React, { useMemo, useState } from "react";

import Table from "@/components/Loader/Table";
import useDebounce from "@/hooks/useDebounce";
import { createColumnHelper } from "@tanstack/react-table";

import { useCountries } from "./hooks";
import { Country } from "./types";

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [population, setPopulation] = useState<string | null>(null);
  const [showCountries, setShowCountries] = useState(false);

  const { isLoading, data } = useCountries({
    enabled: showCountries,
  });

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Country>();

    const columns = [
      columnHelper.accessor((row) => `${row.name}`, {
        id: "name",
        header: "Country Name",
      }),
      columnHelper.accessor((row) => `${row.abbreviation}`, {
        id: "abbreviation",
        header: "Code",
      }),
      columnHelper.accessor((row) => row.capital || "-", {
        id: "capital",
        header: "Capital",
      }),
      columnHelper.accessor((row) => row.phone || "-", {
        id: "phone",
        header: "Ph Code",
      }),
      columnHelper.accessor((row) => row.population, {
        id: "population",
        header: "Population",
        cell: (props) => {
          const population = props.renderValue();
          return population ? population.toLocaleString() : "-";
        },
      }),
      columnHelper.accessor(
        (row) =>
          row.media.flag ? (
            <img src={row.media.flag} className="w-[50px]" />
          ) : (
            "-"
          ),
        {
          id: "flag",
          header: "Flag",
          cell: (props) => props.renderValue(),
        }
      ),
      columnHelper.accessor((row) => row.media.emblem, {
        id: "emblem",
        header: "Emblem",
        cell: (props) => {
          const path = props.renderValue();
          return path ? <img className="w-[40px]" src={path} /> : "-";
        },
      }),
    ];
    return columns;
  }, []);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const populationFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPopulation(e.target.value || null);
  };

  const search = useDebounce({ search: searchValue, delay: 500 });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      let isMatch = true;
      if (search) {
        isMatch = item.name.toLowerCase().includes(search.toLowerCase());
      }

      if (population) {
        const [min, max] = population.split("-").map(Number);
        isMatch = item.population >= min && item.population < max;
      }

      return isMatch;
    });
  }, [data, search, population]);

  const reset = () => {
    setSearchValue("");
    setPopulation(null);
  };

  return (
    <>
      <div className="grid gap-6 mb-6 md:grid-cols-4 items-center">
        <div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Search By Country Name"
            required
            onChange={onSearch}
            value={searchValue}
          />
        </div>
        <div>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={populationFilterChange}
            value={population || ""}
          >
            <option value="">Population</option>
            <option value="0-1000000">{"< "} 1M</option>
            <option value="1000001-5000000">{"< "} 5M</option>
            <option value="5000001-10000000">{"< "} 10M</option>
          </select>
        </div>
        <div>
        <span
          onClick={reset}
          className="underline cursor-pointer text-blue-700"
        >
          Clear
        </span></div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
          onClick={() => setShowCountries((prev) => !prev)}
        >
          {showCountries ? "Hide All Countries" : "Show All Countries"}
        </button>
      </div>
      {showCountries && (
        <Table
          columns={columns}
          data={filteredData || []}
          loading={isLoading}
        />
      )}
    </>
  );
};

export default Home;
