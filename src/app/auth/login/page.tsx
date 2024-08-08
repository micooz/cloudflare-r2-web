"use client";

import { login } from "./actions";
import ErrorIcon from "@mui/icons-material/Error";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { LoadingButton } from "@mui/lab";
import { Alert, TextField } from "@mui/material";
import { useReactive } from "ahooks";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const state = useReactive({
    formData: {
      email: "",
      password: "",
    },
    pending: false,
    error: null as Error | null,
  });

  async function handleLogin() {
    try {
      state.pending = true;
      state.error = null;

      await login({ ...state.formData });

      router.replace("/");
    } catch (err: any) {
      state.error = err;
      state.pending = false;
    }
  }

  return (
    <div className="w-[28rem] max-sm:w-full mx-auto p-8 py-10 flex flex-col gap-4">
      <div className="text-[1.4rem] font-semibold flex justify-center items-center gap-2">
        <LockPersonIcon />
        <span>Authorization Required</span>
      </div>

      <TextField
        name="email"
        type="email"
        placeholder="Email Address"
        required
        onChange={(e) => (state.formData.email = e.target.value)}
      />

      <TextField
        name="password"
        type="password"
        placeholder="Password"
        required
        onChange={(e) => (state.formData.password = e.target.value)}
      />

      <LoadingButton
        type="submit"
        color="primary"
        variant="contained"
        loading={state.pending}
        onClick={handleLogin}
      >
        Login
      </LoadingButton>

      {state.error && (
        <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">
          {state.error.message}
        </Alert>
      )}
    </div>
  );
}
