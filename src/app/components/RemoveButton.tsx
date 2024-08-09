"use client";

import { remove } from "../actions";
import { SubmitButton } from "./SubmitButton";
import { FileItem } from "@/typings/file";
import { useRouter } from "next/navigation";
import React from "react";

export interface RemoveButtonProps {
  file: FileItem;
}

export function RemoveButton(props: RemoveButtonProps) {
  const { file } = props;

  const router = useRouter();

  async function handleDelete() {
    if (confirm(`Are you sure to remove: ${file.name} ?`)) {
      await remove(file.key);
      router.refresh();
    }
  }

  return (
    <form action={handleDelete}>
      <SubmitButton color="error">Delete</SubmitButton>
    </form>
  );
}
