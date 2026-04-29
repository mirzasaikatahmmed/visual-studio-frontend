"use client";

import { useState } from "react";
import { getStoredUser, type AuthUser } from "@/lib/auth";

export function useAuth() {
  const [user] = useState<AuthUser | null>(() => getStoredUser());

  return { user, isAdmin: user?.role === "admin" };
}
