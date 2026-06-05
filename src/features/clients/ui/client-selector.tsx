"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { useClients } from "@/features/clients/api/client.queries";
import { ClientAddModal } from "@/features/clients/ui/client-add-modal";
import { MOCK_CLIENTS } from "@/features/clients/model/client.types";
import { useRecordStore } from "@/features/records/model/record.store";
import { BrutalChip } from "@/shared/ui/design-system/chip";

export function ClientSelector() {
  const [modalOpen, setModalOpen] = useState(false);
  const selectedClient = useRecordStore((s) => s.selectedClient);
  const setSelectedClient = useRecordStore((s) => s.setSelectedClient);
  const { data: clientsFromApi, isError } = useClients();

  const clients =
    clientsFromApi && clientsFromApi.length > 0 && !isError
      ? clientsFromApi
      : MOCK_CLIENTS;

  return (
    <>
      <ClientAddModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <section className="border-b-2 border-black bg-white p-4 text-black">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-base font-bold">회원 선택</h2>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-primary font-black hover:bg-primary/90"
            aria-label="회원 추가"
          >
            <Plus className="h-5 w-5" strokeWidth={3} />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {clients.map((client) => (
            <BrutalChip
              key={client.id}
              label={client.name}
              sublabel={
                "lastSession" in client && client.lastSession
                  ? `최근 ${client.lastSession}`
                  : undefined
              }
              selected={selectedClient?.id === client.id}
              onClick={() => setSelectedClient(client)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
