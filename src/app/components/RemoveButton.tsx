"use client";

import { remove } from "./actions";
import { FileItem } from "@/typings/file";
import React from "react";

export interface RemoveButtonProps {
  file: FileItem;
}

export function RemoveButton(props: RemoveButtonProps) {
  const { file } = props;

  async function handleDelete() {
    try {
      if (confirm(`Are you sure to remove: ${file.name} ?`)) {
        await remove(file.name);
        location.reload();
      }
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div
      className="text-red-700 cursor-pointer hover:text-red-800"
      onClick={handleDelete}
    >
      Delete
    </div>
  );
}
