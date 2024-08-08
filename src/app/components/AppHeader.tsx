import { SubmitButton } from "./SubmitButton";
import { isSupabaseEnabled, MAIN_TITLE } from "@/constants";
import { logout } from "@/utils/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";

interface AppHeaderProps {}

export function AppHeader(props: AppHeaderProps) {
  return (
    <div className="flex justify-between items-center border-gray-200 bg-gray-50 px-4 py-2 border-b">
      <h1 className="font-semibold text-lg">{MAIN_TITLE}</h1>

      {isSupabaseEnabled && (
        <form action={logout}>
          <SubmitButton startIcon={<LogoutIcon />}>Logout</SubmitButton>
        </form>
      )}
    </div>
  );
}
