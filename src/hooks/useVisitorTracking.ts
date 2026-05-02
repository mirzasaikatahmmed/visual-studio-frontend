"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";
const HEARTBEAT_INTERVAL = 30_000;

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("vs_session_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("vs_session_id", id);
  }
  return id;
}

export function useVisitorTracking() {
  const pathname = usePathname();
  const startTime = useRef<number>(0);
  const sessionId = useRef("");

  useEffect(() => {
    sessionId.current = getSessionId();
    startTime.current = Date.now();

    const referrer = document.referrer || "";
    const userAgent = navigator.userAgent;

    fetch(`${BASE}/visitors/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sessionId.current, page: pathname, referrer, userAgent }),
    }).catch(() => {});

    const heartbeat = setInterval(() => {
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      fetch(`${BASE}/visitors/session/${sessionId.current}/heartbeat`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: pathname, durationSeconds: duration }),
      }).catch(() => {});
    }, HEARTBEAT_INTERVAL);

    const onLeave = () => {
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      navigator.sendBeacon(
        `${BASE}/visitors/session/${sessionId.current}/leave`,
        new Blob([JSON.stringify({ durationSeconds: duration })], { type: "application/json" }),
      );
    };

    window.addEventListener("beforeunload", onLeave);

    return () => {
      clearInterval(heartbeat);
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [pathname]);
}
