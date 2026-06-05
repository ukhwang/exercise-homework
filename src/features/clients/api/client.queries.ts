"use client";

import { useQuery } from "@tanstack/react-query";

import type { Client } from "@/features/clients/model/client.types";

async function fetchClients(): Promise<Client[]> {
  const response = await fetch("/api/clients");
  const json: unknown = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof json === "object" &&
        json !== null &&
        "error" in json &&
        typeof (json as { error: unknown }).error === "string"
        ? (json as { error: string }).error
        : "회원 목록을 불러오지 못했습니다."
    );
  }

  if (
    typeof json === "object" &&
    json !== null &&
    "clients" in json &&
    Array.isArray((json as { clients: unknown }).clients)
  ) {
    return (json as { clients: Client[] }).clients;
  }

  throw new Error("서버 응답 형식이 올바르지 않습니다.");
}

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    staleTime: 30_000,
  });
}
