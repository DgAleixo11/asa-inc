"use client";

import { useEffect } from "react";

export default function PwaProvider() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((error) => console.error("Erro ao registrar SW:", error));
    }
  }, []);

  return null;
}