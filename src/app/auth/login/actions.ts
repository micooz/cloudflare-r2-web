"use server";

import { createClient } from "@/utils/supabase/server";

export type LoginFormData = {
  email: string;
  password: string;
};

export async function login(formData: LoginFormData) {
  const { email, password } = formData;

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }
}
