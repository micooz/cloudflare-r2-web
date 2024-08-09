"use client";

import { cn } from "@/utils/cn";
import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Alert, LinearProgress } from "@mui/material";
import { useReactive } from "ahooks";
import axios from "axios";
import { useRouter } from "next/navigation";
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

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const state = useReactive({
    error: null as Error | null,
    uploading: false,
    progress: 0,
  });

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    state.uploading = true;
    state.progress = 0;

    try {
      state.error = null;

      // Next.js Server Action does not support upload progress, so use axios to do that.
      await axios.postForm(
        "/api/upload",
        {
          file,
        },
        {
          onUploadProgress(progressEvent) {
            state.progress = progressEvent.progress || 0;
          },
        },
      );

      router.refresh();
    } catch (err: any) {
      state.error = err;
    } finally {
      state.uploading = false;

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div>
      <div className="mb-2">
        {state.uploading ? (
          <LinearProgress variant="determinate" value={state.progress} />
        ) : (
          <div className="h-[4px] " />
        )}
      </div>

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
          ref={inputRef}
          type="file"
          name="file"
          disabled={state.uploading}
          onChange={handleFile}
        />
      </label>
    </div>
  );
}
