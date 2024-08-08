import { AppHeader } from "./components/AppHeader";
import { FileManager } from "./components/FileManager";
import { Uploader } from "./components/Uploader";
import { checkAuth } from "@/utils/auth";
import { cn } from "@/utils/cn";
import React from "react";

export default async function Page() {
  await checkAuth();

  return (
    <div>
      <AppHeader />
      <div className={cn("p-4 flex flex-col gap-4")}>
        <Uploader />
        <FileManager />
      </div>
    </div>
  );
}
