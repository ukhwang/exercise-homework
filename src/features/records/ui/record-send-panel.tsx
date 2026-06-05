"use client";

import { useMemo, useState } from "react";

import { BrutalButton } from "@/shared/ui/design-system/button";
import { useCreateRecord } from "@/features/records/api/record.mutations";
import { useAppointmentConflict } from "@/features/records/api/record.queries";
import { useRecordStore } from "@/features/records/model/record.store";
import { BrutalistToast } from "@/shared/ui/brutalist-toast";

export function RecordSendPanel() {
  const selectedClient = useRecordStore((s) => s.selectedClient);
  const appointmentTime = useRecordStore((s) => s.appointmentTime);
  const setAppointmentTime = useRecordStore((s) => s.setAppointmentTime);
  const getWeeklyPlanForSave = useRecordStore((s) => s.getWeeklyPlanForSave);
  const totalCount = useRecordStore((s) =>
    Object.values(s.planByDay).reduce((sum, list) => sum + list.length, 0)
  );

  const [toastVisible, setToastVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data: conflictData } = useAppointmentConflict(
    selectedClient ? appointmentTime : null
  );

  const { mutate, isPending } = useCreateRecord({
    onCopiedFallback: () => setToastVisible(true),
  });

  const canSend =
    selectedClient !== null && totalCount > 0 && !isPending;

  const hasConflict = conflictData?.hasConflict === true;

  const appointmentLabel = useMemo(() => {
    if (!appointmentTime) return "";
    try {
      const d = new Date(appointmentTime);
      return d.toLocaleString("ko-KR", {
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return appointmentTime;
    }
  }, [appointmentTime]);

  const handleSend = () => {
    if (!canSend || !selectedClient) return;
    setErrorMessage(null);

    mutate(
      {
        clientId: selectedClient.id,
        appointmentTime: new Date(appointmentTime).toISOString(),
        weeklyPlan: getWeeklyPlanForSave(),
        note: null,
      },
      {
        onError: (error) => {
          setErrorMessage(
            error instanceof Error ? error.message : "저장에 실패했습니다."
          );
        },
      }
    );
  };

  if (!selectedClient || totalCount === 0) {
    return null;
  }

  return (
    <>
      <BrutalistToast
        message="복사 완료! 카톡에 붙여넣으세요"
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-black bg-white p-4">
        <label className="mb-3 block">
          <span className="text-xs font-bold uppercase text-black/60">
            예약 시간
          </span>
          <input
            type="datetime-local"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="mt-1 w-full border-2 border-black px-3 py-2 text-sm font-bold"
          />
        </label>

        {hasConflict ? (
          <p className="mb-3 border-2 border-black bg-alert px-3 py-2 text-center text-sm font-bold text-black">
            ⚠️ 동일 시간대 중복 예약됨
            {appointmentLabel ? ` (${appointmentLabel})` : ""}
          </p>
        ) : null}

        <BrutalButton
          variant="primary"
          size="large"
          disabled={!canSend}
          onClick={handleSend}
          className="w-full disabled:bg-brutal-gray disabled:text-black/50"
        >
          {isPending ? "저장 중..." : "저장 및 카카오 전송"}
        </BrutalButton>
        {errorMessage ? (
          <p className="mt-2 text-center text-xs font-bold text-black">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </>
  );
}
