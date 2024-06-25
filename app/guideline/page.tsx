"use client";
import DashboardLayout from "../layouts/Dashboard";
import { useEffect, useState } from "react";
import { useQuery} from "@tanstack/react-query";
import {  getGuideline } from "@/API/guideline.api";
import { GuidelinesData } from "@/types/types";
import { Notifications } from "@/components/Notification";
import { GuidelineEditor } from "@/components/GuidelineEditor";
import { GuidelineButton } from "@/components/GuidelineButton";
import GuidelineTabs from "../layouts/GuidelineTabs";

export default function GuidelinePage() {
  const [value, setValue] = useState("");

  const { data, isLoading } = useQuery<GuidelinesData>({
    queryKey: ["terms"],
    queryFn: () => getGuideline("TermsAndConditions"),
  });

  useEffect(() => {
  setValue(data?.response.guidelines[0].content || ""); 
  }, [data])

  if(isLoading) return <div>loading...</div>

  return (
    <DashboardLayout active={5} title="Guidelines">
      <div className="px-10 pb-10">
      <GuidelineTabs path="/guideline"/>
        <div className="flex gap-5 mt-5">
          <div className="flex flex-col gap-10 w-[80%] justify-between">
            <GuidelineEditor setValue={setValue} value={value} />
            <div className="flex justify-center mt-5">
            <GuidelineButton value={value} type="TermsAndConditions" title="Terms And Conditions"/>
            </div>
          </div>
          <div className="w-[25%]">
          <Notifications />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}




