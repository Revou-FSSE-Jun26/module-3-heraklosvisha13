"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function PublicOnlyRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoggedIn, currentUser } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      // Jika sudah login, tendang ke home (atau dashboard jika admin)
      const redirect = currentUser?.role === "admin" ? "/dashboard" : "/";
      router.replace(redirect);
    }
  }, [isLoggedIn, currentUser, router]);

  if (isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}