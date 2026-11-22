"use client";

import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="text-sm font-medium text-muted hover:text-accent underline underline-offset-4">
      Log Out
    </button>
  );
}
