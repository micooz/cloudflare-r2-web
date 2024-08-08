"use client";

import { remove } from "../actions";
import { SubmitButton } from "./SubmitButton";
import { FileItem } from "@/typings/file";
import React from "react";

export interface RemoveButtonProps {
  file: FileItem;
}

export function RemoveButton(props: RemoveButtonProps) {
  const { file } = props;

  async function handleDelete() {
    if (confirm(`Are you sure to remove: ${file.name} ?`)) {
      await remove(file.key);
      location.reload();
    }
  }

  return (
    <form action={handleDelete}>
      <SubmitButton color="error">Delete</SubmitButton>
    </form>
  );
}
