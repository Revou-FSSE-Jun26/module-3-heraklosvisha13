"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoggedIn, currentUser } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    } else if (currentUser?.role !== "admin") {
      router.replace("/");
    }
  }, [isLoggedIn, currentUser, router]);

  // Cegah render jika belum login atau bukan admin
  if (!isLoggedIn || currentUser?.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}