"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function KbdShortcuts() {
  const router = useRouter();

  useEffect(() => {
    let buffer = "";
    let timer: ReturnType<typeof setTimeout> | null = null;
    const map: Record<string, string> = {
      gh: "/",
      gp: "/plan",
      gr: "/progress",
      gs: "/resources",
      gd: "/decisions",
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      buffer += e.key.toLowerCase();
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        buffer = "";
      }, 600);
      const dest = map[buffer];
      if (dest) {
        buffer = "";
        router.push(dest);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return null;
}
