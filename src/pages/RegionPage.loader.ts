import type { LoaderFunctionArgs } from "react-router-dom";

type Province = {
  id: number;
  name: string;
};

type Regency = {
  id: number;
  name: string;
  province_id: number;
};

type District = {
  id: number;
  name: string;
  regency_id: number;
};

export type LoaderData = {
  provinces: Province[];
  regencies: Regency[];
  districts: District[];
  province: string;
  regency: string;
  district: string;
};

export async function regionLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const province = url.searchParams.get("province") || "";
  const regency = url.searchParams.get("regency") || "";
  const district = url.searchParams.get("district") || "";

  const response = await fetch("/data/indonesia_regions.json");

  if (!response.ok) {
    throw new Response("Failed to fetch data", { status: 500 });
  }

  const data = await response.json();

  return {
    provinces: data.provinces,
    regencies: data.regencies,
    districts: data.districts,
    province,
    regency,
    district,
  } satisfies LoaderData;
}
