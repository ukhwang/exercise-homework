"use client";

import { useMutation } from "@tanstack/react-query";

import {
  buildHomeworkShareUrl,
  shareHomeworkLink,
} from "@/features/share/lib/share-homework";
import type { CreateRecordBody, CreateRecordResponse } from "@/features/records/model/record.schema";
import { createRecordResponseSchema } from "@/features/records/model/record.schema";
import { useRecordStore } from "@/features/records/model/record.store";

async function createRecord(
  body: CreateRecordBody
): Promise<CreateRecordResponse> {
  const response = await fetch("/api/records", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json: unknown = await response.json();

  if (!response.ok) {
    const err =
      typeof json === "object" &&
      json !== null &&
      "error" in json &&
      typeof (json as { error: unknown }).error === "string"
        ? (json as { error: string }).error
        : "저장에 실패했습니다.";
    throw new Error(err);
  }

  const parsed = createRecordResponseSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error("서버 응답 형식이 올바르지 않습니다.");
  }

  return parsed.data;
}

type UseCreateRecordOptions = {
  onCopiedFallback?: () => void;
};

export function useCreateRecord(options?: UseCreateRecordOptions) {
  const resetWorkspace = useRecordStore((s) => s.resetWorkspace);

  return useMutation({
    mutationFn: createRecord,
    onSuccess: async (data) => {
      const shareUrl = buildHomeworkShareUrl(data.magic_token);
      await shareHomeworkLink(shareUrl, () => {
        options?.onCopiedFallback?.();
      });
      resetWorkspace();
    },
  });
}
