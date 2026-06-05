"use client";

import { useQuery } from "@tanstack/react-query";

import {
  appointmentConflictResponseSchema,
  latestCompletedRecordResponseSchema,
  recentFeedbackResponseSchema,
} from "@/features/records/model/record.schema";

async function fetchLatestCompletedRecord(clientId: string) {
  const response = await fetch(
    `/api/records/latest?clientId=${encodeURIComponent(clientId)}`
  );

  const json: unknown = await response.json();

  if (!response.ok) {
    const err =
      typeof json === "object" &&
      json !== null &&
      "error" in json &&
      typeof (json as { error: unknown }).error === "string"
        ? (json as { error: string }).error
        : "피드백을 불러오지 못했습니다.";
    throw new Error(err);
  }

  const parsed = latestCompletedRecordResponseSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error("서버 응답 형식이 올바르지 않습니다.");
  }

  return parsed.data.record;
}

async function fetchRecentFeedback(clientId: string) {
  const response = await fetch(
    `/api/records/recent-feedback?clientId=${encodeURIComponent(clientId)}`
  );

  const json: unknown = await response.json();

  if (!response.ok) {
    const err =
      typeof json === "object" &&
      json !== null &&
      "error" in json &&
      typeof (json as { error: unknown }).error === "string"
        ? (json as { error: string }).error
        : "피드백을 불러오지 못했습니다.";
    throw new Error(err);
  }

  const parsed = recentFeedbackResponseSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error("서버 응답 형식이 올바르지 않습니다.");
  }

  return parsed.data.items;
}

async function fetchAppointmentConflict(appointmentTime: string) {
  const response = await fetch(
    `/api/records/conflict?appointmentTime=${encodeURIComponent(appointmentTime)}`
  );

  const json: unknown = await response.json();

  if (!response.ok) {
    const err =
      typeof json === "object" &&
      json !== null &&
      "error" in json &&
      typeof (json as { error: unknown }).error === "string"
        ? (json as { error: string }).error
        : "예약 시간을 확인하지 못했습니다.";
    throw new Error(err);
  }

  const parsed = appointmentConflictResponseSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error("서버 응답 형식이 올바르지 않습니다.");
  }

  return parsed.data;
}

export function useLatestCompletedRecord(clientId: string | null) {
  return useQuery({
    queryKey: ["records", "latest-completed", clientId],
    queryFn: () => fetchLatestCompletedRecord(clientId!),
    enabled: clientId !== null,
    staleTime: 0,
    gcTime: 60_000,
    refetchOnMount: "always",
  });
}

export function useRecentFeedback(clientId: string | null) {
  return useQuery({
    queryKey: ["records", "recent-feedback", clientId],
    queryFn: () => fetchRecentFeedback(clientId!),
    enabled: clientId !== null,
    staleTime: 0,
    refetchOnMount: "always",
  });
}

export function useAppointmentConflict(appointmentTime: string | null) {
  return useQuery({
    queryKey: ["records", "conflict", appointmentTime],
    queryFn: () => fetchAppointmentConflict(appointmentTime!),
    enabled: appointmentTime !== null && appointmentTime.length > 0,
    staleTime: 5_000,
  });
}
