"use client";

import { remove } from "./actions";
import { FileItem } from "@/typings/file";
import { cn } from "@/utils/cn";
import { CircularProgress } from "@mui/material";
import { useReactive } from "ahooks";
import React from "react";

export interface RemoveButtonProps {
  file: FileItem;
}

export function RemoveButton(props: RemoveButtonProps) {
  const { file } = props;

  const state = useReactive({
    pending: false,
  });

  async function handleDelete() {
    if (state.pending) {
      return;
    }

    try {
      state.pending = true;

      if (confirm(`Are you sure to remove: ${file.name} ?`)) {
        await remove(file.name);
        location.reload();
      }
    } catch (err: any) {
      alert(err.message);
      state.pending = false;
    }
  }

  return (
    <div
      className={cn(
        "w-24",
        "text-red-700 cursor-pointer hover:text-red-800",
        state.pending && "cursor-not-allowed ",
      )}
      onClick={handleDelete}
    >
      {state.pending ? <CircularProgress size={16} /> : "Delete"}
    </div>
  );
}
