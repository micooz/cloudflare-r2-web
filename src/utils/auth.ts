"use server";

import { createClient } from "./supabase/server";
import { isSupabaseEnabled } from "@/constants";
import { redirect } from "next/navigation";

export async function checkAuth() {
  if (!isSupabaseEnabled) {
    return;
  }

  const user = await getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  return;
}

export async function getUser() {
  if (!isSupabaseEnabled) {
    return null;
  }

  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return null;
  }

  return user;
}

export async function logout() {
  if (!isSupabaseEnabled) {
    return;
  }

  const supabase = createClient();

  await supabase.auth.signOut();
}
