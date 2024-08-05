"use client";

import { upload } from "./actions";
import { cn } from "@/utils/cn";
import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Alert, LinearProgress } from "@mui/material";
import { useReactive } from "ahooks";
import { ChangeEvent, useRef } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface UploaderProps {
  className?: string;
}

export function Uploader(props: UploaderProps) {
  const { className } = props;

  const state = useReactive({
    error: null as Error | null,
    uploading: false,
  });

  const formRef = useRef<HTMLFormElement>(null);

  async function handleUpload(formData: FormData) {
    try {
      state.error = null;
      state.uploading = true;

      await upload(formData);

      location.reload();
    } catch (err: any) {
      state.error = err;
      state.uploading = false;
    }
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (state.uploading) {
      return;
    }
    formRef.current?.requestSubmit();
  }

  return (
    <form ref={formRef} action={handleUpload}>
      {state.uploading && <LinearProgress className="mb-4" />}

      {state.error && (
        <Alert className="mb-4" severity="error">
          {state.error.message}
        </Alert>
      )}

      <label
        className={cn(
          className,
          "flex gap-2 justify-center items-center p-4",
          "border border-dashed border-gray-400",
          "text-sky-700 cursor-pointer hover:text-sky-800 hover:border-gray-500",
          state.uploading &&
            "text-gray-700 hover:text-gray-700 cursor-not-allowed",
        )}
      >
        <CloudUploadIcon />
        <span>Choose a file to upload</span>
        <VisuallyHiddenInput
          type="file"
          name="file"
          disabled={state.uploading}
          onChange={handleFile}
        />
      </label>
    </form>
  );
}
