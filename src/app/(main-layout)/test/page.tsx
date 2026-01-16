import Error from "@/app/error";
import GlobalError from "@/app/global-error";
import { ComingSoonPage } from "@/components/ui/coming-soon-page";
import { GlobalLoading } from "@/components/ui/global-loading";
import { MaintenancePage } from "@/components/ui/maintenance-page";
import React from "react";

const page = () => {
  return (
    <div>
      {/* <GlobalLoading /> */}
      {/* <GlobalError /> */}
      {/* <Error /> */}
      {/* <MaintenancePage /> */}
      <ComingSoonPage />
    </div>
  );
};

export default page;
