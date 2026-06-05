"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Client } from "@/features/clients/model/client.types";

async function createClient(name: string): Promise<Client> {
  const response = await fetch("/api/clients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  const json: unknown = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof json === "object" &&
        json !== null &&
        "error" in json &&
        typeof (json as { error: unknown }).error === "string"
        ? (json as { error: string }).error
        : "회원 추가에 실패했습니다."
    );
  }

  if (
    typeof json === "object" &&
    json !== null &&
    "client" in json &&
    typeof (json as { client: Client }).client === "object"
  ) {
    return (json as { client: Client }).client;
  }

  throw new Error("서버 응답 형식이 올바르지 않습니다.");
}

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}
