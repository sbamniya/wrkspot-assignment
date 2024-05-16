import RestClient from "@/utils/RestClient";
import { Country } from "./types";

export const getCountries = async () =>
  (await RestClient.get<Country[]>("/countries/countries")).data;
