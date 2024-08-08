"use client";

import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { useFormStatus } from "react-dom";

export interface SubmitButtonProps extends LoadingButtonProps {}

export function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <LoadingButton type="submit" loading={pending} {...props}>
      {props.children}
    </LoadingButton>
  );
}
