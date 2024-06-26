"use client";
import Image from "next/image";
import Link from "next/link";
import { AdminProfile } from "@/components/AdminProfile";
import { navLinks } from "@/types/data";
import { LogoutBtn } from "@/components/helpers/LogoutBtn";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/API/auth.api";
import { useEffect } from "react";
import { useAuth } from "@/store/AuthProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { DashboardTypes } from "@/types/types";

export default function DashboardLayout({
  active,
  title,
  children,
}: {
  children?: React.ReactNode;
  active?: number;
  title:string
}) {
  const router = useRouter();
  const { user, setUser } = useAuth();
  // Fetching current User
  const { data, isLoading } = useQuery<DashboardTypes>({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(),
    initialData: user ? { success: true, response: user } : undefined,
  });

  if (!isLoading && data && !data.success) {
    localStorage.removeItem("access-token");
    Cookies.remove("session");
    toast.error("Session expired");
    router.push("/dashboard");
  }
  useEffect(() => {
    if (!isLoading && data && data.success && data.response) {
      setUser(data.response);
    }
  }, [data]);

  return (
    <>
      <aside className="fixed min-h-screen w-64 flex-col overflow-y-auto  py-8 z-10 bg-[#395E66] ">
        <div className="flex items-center space-x-2 px-5">
          <Image
            src="/assets/logo2.svg"
            alt="Story Time"
            width={200}
            height={20}
          />
        </div>

        <div className="mt-6 flex flex-1 flex-col justify-between ">
          <nav className="space-y-6">
            {navLinks.map((item) => (
              <div className="space-y-3 " key={item.id}>
                <Link
                  className={`py-3 flex transform items-center r px-3 ml-4 rounded-l-3xl text-white transition-colors duration-300  ${active == item.id ? "bg-[#427682]" : null
                    }`}
                  href={item.path}
                >
                  <Image
                    src={item.Logo}
                    alt="Icon"
                    width={20}
                    height={20}
                    className="fill-red-700"
                    style={{ fill: "red", color: "red" }}
                  />{" "}
                  <span className={`mx-2 text-lg font-medium`}>
                    {item.category}
                  </span>
                </Link>
              </div>
            ))}
            <LogoutBtn />
          </nav>
        </div>
      </aside>

      {/* Add the main content here */}
      <div className=" overflow-x-hidden overflow-y-auto ">
        {/* Your main content goes here */}
        <nav className="relative gap-7 px-9 pt-9  mr-1 pb-2 bg-[#FAFAFA] h-44">
          <div className="flex justify-end items-center gap-5">
            <Image src={"/assets/bell.png"} alt="Icon" width={30} height={20} />
            <AdminProfile />
          </div>
          <div className="px-[265px] pt-6">
            <h1 className="text-5xl font-bold text-[#093732]">{title}</h1>
          </div>
        </nav>
        <div className="flex-1 overflow-x-hidden overflow-y-auto ml-64 bg-backGroundColor  ">
          {children}
        </div>
      </div>
    </>
  );
}
