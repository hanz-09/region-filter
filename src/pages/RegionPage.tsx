/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useSearchParams } from "react-router-dom";
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

type LoaderData = {
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

export default function RegionPage() {
  const {
    provinces,
    regencies,
    districts,
    province,
    regency,
    district,
  } = useLoaderData() as LoaderData;

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedProvince = provinces.find(
    (p) => p.id === Number(province)
  );

  const filteredRegencies = regencies.filter(
    (r) => r.province_id === Number(province)
  );

  const selectedRegency = regencies.find(
    (r) => r.id === Number(regency)
  );

  const filteredDistricts = districts.filter(
    (d) => d.regency_id === Number(regency)
  );

  const selectedDistrict = filteredDistricts.find(
    (d) => d.id === Number(district)
  );

  const handleChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    if (key === "province") {
      params.delete("regency");
      params.delete("district");
    }

    if (key === "regency") {
      params.delete("district");
    }

    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 lg:flex">
      <aside className="w-full border-b border-slate-300 bg-slate-100 px-6 py-8 lg:w-[340px] lg:border-b-0 lg:border-r lg:px-8 lg:py-9">
        <div className="mb-10 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-100 text-sm font-semibold text-blue-500">
            FA
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-950">
            Frontend Assessment
          </h1>
        </div>

        <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
          Filter Wilayah
        </p>

        <div className="space-y-6">
          <div className="space-y-2.5">
            <label
              htmlFor="province"
              className="block text-base font-bold uppercase text-slate-500"
            >
              Provinsi
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-500">
                v
              </span>
              <select
                id="province"
                name="province"
                value={province}
                onChange={(e) =>
                  handleChange("province", e.target.value)
                }
                className="h-14 w-full appearance-none rounded-2xl border border-slate-400 bg-slate-100 py-0 pl-4 pr-11 text-[17px] font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="regency"
              className="block text-base font-bold uppercase text-slate-500"
            >
              Kota/Kabupaten
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-500">
                v
              </span>
              <select
                id="regency"
                name="regency"
                value={regency}
                onChange={(e) =>
                  handleChange("regency", e.target.value)
                }
                disabled={!province}
                className="h-14 w-full appearance-none rounded-2xl border border-slate-400 bg-slate-100 py-0 pl-4 pr-11 text-[17px] font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-65"
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {filteredRegencies.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="district"
              className="block text-base font-bold uppercase text-slate-500"
            >
              Kecamatan
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-500">
                v
              </span>
              <select
                id="district"
                name="district"
                value={district}
                onChange={(e) =>
                  handleChange("district", e.target.value)
                }
                disabled={!regency}
                className="h-14 w-full appearance-none rounded-2xl border border-slate-400 bg-slate-100 py-0 pl-4 pr-11 text-[17px] font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-65"
              >
                <option value="">Pilih Kecamatan</option>
                {filteredDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="mt-3 h-[62px] w-full rounded-2xl border-2 border-blue-600 bg-transparent text-base font-extrabold uppercase tracking-[0.13em] text-slate-700 transition hover:bg-slate-200"
          >
            Reset
          </button>
        </div>
      </aside>

      <main className="flex-1">
        <nav className="breadcrumb flex min-h-[86px] flex-wrap items-center gap-y-2 border-b border-slate-300 px-6 py-5 text-[15px] font-bold uppercase tracking-[0.13em] text-slate-400 lg:px-12 lg:py-0">
          <span>Indonesia</span>
          {selectedProvince && (
            <>
              <span className="mx-3 text-slate-300">{">"}</span>
              <span>{selectedProvince.name}</span>
            </>
          )}
          {selectedRegency && (
            <>
              <span className="mx-3 text-slate-300">{">"}</span>
              <span>{selectedRegency.name}</span>
            </>
          )}
          {selectedDistrict && (
            <>
              <span className="mx-3 text-slate-300">{">"}</span>
              <span className="text-blue-600">
                {selectedDistrict.name}
              </span>
            </>
          )}
        </nav>

        <section className="px-4 pb-12 pt-12 text-center lg:pt-20">
          <div className="py-8">
            <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-blue-400">
              Provinsi
            </p>
            <h2 className="mt-3 text-5xl font-extrabold tracking-tight text-slate-950 lg:text-8xl">
              {selectedProvince?.name || "Indonesia"}
            </h2>
            <div className="mt-10 text-4xl text-slate-300">|</div>
          </div>

          <div className="py-8">
            <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-blue-400">
              Kota / Kabupaten
            </p>
            <h3 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-800 lg:text-7xl">
              {selectedRegency?.name || "-"}
            </h3>
            <div className="mt-10 text-4xl text-slate-300">|</div>
          </div>

          <div className="py-8">
            <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-blue-400">
              Kecamatan
            </p>
            <h4 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-6xl">
              {selectedDistrict?.name || "-"}
            </h4>
          </div>
        </section>
      </main>
    </div>
  );
}
