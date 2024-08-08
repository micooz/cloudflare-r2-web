"use client";

import { isSupabaseEnabled, MAIN_TITLE } from "@/constants";
import { logout } from "@/utils/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import { LoadingButton } from "@mui/lab";
import { useReactive } from "ahooks";
import React from "react";

export interface AppHeaderProps {}

export function AppHeader(props: AppHeaderProps) {
  const {} = props;

  const state = useReactive({
    pending: false,
  });

  async function handleLogout() {
    try {
      state.pending = true;
      await logout();
      location.replace('/auth/login');
    } catch (err) {
      state.pending = false;
    }
  }

  return (
    <div className="flex justify-between items-center py-2 px-4 border-b border-gray-200 bg-gray-50">
      <h1 className="font-semibold text-lg">{MAIN_TITLE}</h1>

      {isSupabaseEnabled && (
        <div>
          <LoadingButton
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            loading={state.pending}
          >
            Logout
          </LoadingButton>
        </div>
      )}
    </div>
  );
}
