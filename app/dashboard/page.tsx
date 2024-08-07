"use client";
import DashboardLayout from "../layouts/Dashboard";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { Heading } from "@/types/data";
import SearchBar from "@/components/SearchBar";
import States from "@/components/states";
import { useQuery } from "@tanstack/react-query";
import { getUsers, userCount } from "@/API/dashboard.api";
import { Download } from "lucide-react";
import { DashboardPagination } from "@/components/helpers/DashboardPagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { UserSkeleton } from "@/components/skeletons/UserSkeleton";
import { DashboardTypes } from "@/types/types";
import { CSVLink } from "react-csv";
import { headers } from "@/lib/utils";
import StatesSkeleton from "@/components/stateSkeleton";
interface Params {
  searchParams: {
    page: number;
    limit: number;
    search: string;
    status: "active" | "inactive" | undefined;
  };
}

export default function Dashboard({ searchParams }: Params) {
  const { page, limit, search, status } = searchParams;
  const decodedSearch = decodeURIComponent(search);

  const { data, isLoading } = useQuery<DashboardTypes>({
    queryKey: ["users", page, limit, search, status],
    queryFn: () => getUsers({ page, limit, search, status: status || "" }),
  });

  const { data: count, isLoading: loading } = useQuery({
    queryKey: ["user-count"],
    queryFn: userCount
  });

  const pathname = usePathname();
  const urlSearchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(urlSearchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  console.log(data);
  
  return (
    <DashboardLayout active={1} title="Dashboard & Users">
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 overflow-y-auto">
          <div className="pl-10">
            <section>
              <div className="flex w-full items-center gap-10 my-6">
                {
                  loading ? 
                 <>
                 <StatesSkeleton/>
                 <StatesSkeleton/>
                 <StatesSkeleton/>
                 </>
                   : (
                    <>
                      <States iconPath="done" title="Total Downloads" total="1.4k" />
                      <States iconPath="mark2" title="Guests" total={`${count?.response.guestCount}`} />
                      <States iconPath="star2" title="Premium Users" total={`${count?.response.userCount}`} />
                    </>
                  )
                }

              </div>
              <div className="flex gap-10 border-b-2 text-center border-[#E44173] pb-4 relative">
                <button
                  className={`${!status ? "font-bold text-primaryCol" : "opacity-50"
                    } text-center cursor-pointer`}
                  onClick={() =>
                    router.push(
                      pathname + "?" + createQueryString("status", "")
                    )
                  }
                >
                  All
                </button>
                <button
                  className={`${status === "active" ? "text-primaryCol" : "opacity-50"
                    } text-center font-bold cursor-pointer`}
                  onClick={() =>
                    router.push(
                      `${pathname}?${createQueryString("status", "active")}`
                    )
                  }
                >
                  Active
                </button>
                <button
                  className={`${status === "inactive" ? "text-primaryCol" : "opacity-50"
                    } text-center font-bold cursor-pointer`}
                  onClick={() =>
                    router.push(
                      `${pathname}?${createQueryString("status", "inactive")}`
                    )
                  }
                >
                  Inactive
                </button>
              </div>
            </section>
          </div>
          <div className="flex justify-between px-10 mt-5 my-2">
            <SearchBar initialValue={search || ""} />
            <div>
              <Button
                variant={"outline"}
                className="border-[#395E66] flex gap-2 items-center text-[#395E66]"
              >
                {data && data.response && (
                  <CSVLink data={data.response.users} headers={headers} className="flex gap-2 items-center">Export CSV <Download className="size-5" target="_blank" /></CSVLink>
                )}
              </Button>
            </div>
          </div>
          <div className="mx-10">
            {isLoading ? (
              <UserSkeleton />
            ) : (
              data &&
              data.success &&
              data.response &&
              data.response.users.length > 0 && (
                <DataTable
                  TableData={data.response.users}
                  TableHeading={Heading}
                />
              )
            )}
            {!data ||
              (!data.response && (
                <h2 className="text-black text-4xl font-bold mt-2">
                  No results
                </h2>
              ))}
          </div>
        </div>
        <footer className="bg-[#395E66] text-white text-center py-4 w-full mx-10">
          {data &&
            data.success &&
            data.response &&
            data.response.pagination && (
              <DashboardPagination data={data.response.pagination} />
            )}
        </footer>
      </div>
    </DashboardLayout>
  );
}
