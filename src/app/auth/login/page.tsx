"use client";

import { login } from "./actions";
import { SubmitButton } from "@/app/components/SubmitButton";
import ErrorIcon from "@mui/icons-material/Error";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { Alert, FormControl, TextField } from "@mui/material";
import React from "react";
import { useFormState } from "react-dom";

export default function Page() {
  // TODO: after Next.js 15 (with React 19) publish, we can use useActionState instead of useFormState and <SubmitButton />.
  const [error, submitAction] = useFormState(login, null);

  return (
    <form
      action={submitAction}
      className="flex flex-col gap-4 mx-auto py-10 p-8 w-[28rem] max-sm:w-full"
    >
      <div className="flex justify-center items-center gap-2 font-semibold text-[1.4rem]">
        <LockPersonIcon />
        <span>Authorization Required</span>
      </div>

      <FormControl required>
        <TextField
          name="email"
          type="email"
          placeholder="Email Address"
          required
        />
      </FormControl>

      <FormControl required>
        <TextField
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </FormControl>

      <FormControl required>
        <SubmitButton type="submit" color="primary" variant="contained">
          Login
        </SubmitButton>
      </FormControl>

      {error && (
        <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">
          {error}
        </Alert>
      )}
    </form>
  );
}
