"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { useCreateClient } from "@/features/clients/api/client.mutations";
import { BrutalButton } from "@/shared/ui/design-system/button";
import { useRecordStore } from "@/features/records/model/record.store";

type ClientAddModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ClientAddModal({ open, onClose }: ClientAddModalProps) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const setSelectedClient = useRecordStore((s) => s.setSelectedClient);
  const { mutate, isPending } = useCreateClient();

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setErrorMessage("이름을 입력해 주세요.");
      return;
    }

    setErrorMessage(null);
    mutate(trimmed, {
      onSuccess: (client) => {
        setSelectedClient(client);
        setName("");
        onClose();
      },
      onError: (err) => {
        setErrorMessage(
          err instanceof Error ? err.message : "회원 추가에 실패했습니다."
        );
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-add-title"
    >
      <div className="w-full max-w-sm border-2 border-black bg-white p-4 text-black shadow-none">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="client-add-title" className="text-lg font-bold">
            회원 추가
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border-2 border-black"
            aria-label="닫기"
          >
            <X className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-bold">이름</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full border-2 border-black px-3 py-3 text-base font-medium outline-none focus:ring-2 focus:ring-primary"
              placeholder="예: 홍길동"
              autoFocus
              maxLength={80}
            />
          </label>

          {errorMessage ? (
            <p className="text-xs font-bold text-black">{errorMessage}</p>
          ) : null}

          <BrutalButton
            type="submit"
            variant="primary"
            size="large"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "추가 중..." : "추가하기"}
          </BrutalButton>
        </form>
      </div>
    </div>
  );
}
