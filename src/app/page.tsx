import { FileManager } from "./components/FileManager";
import { Uploader } from "./components/Uploader";
import { cn } from "@/utils/cn";
import React from "react";

export default async function Page() {
  return (
    <div className={cn("p-4 flex flex-col gap-4")}>
      <Uploader />
      <FileManager />
    </div>
  );
}
