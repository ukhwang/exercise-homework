export type Client = {
  id: string;
  name: string;
  lastSession?: string;
};

/** Supabase seed UUIDs와 동기화 */
export const MOCK_CLIENTS: Client[] = [
  { id: "a0000001-0000-4000-8000-000000000001", name: "김민수", lastSession: "06.01" },
  { id: "a0000001-0000-4000-8000-000000000002", name: "이지연", lastSession: "06.02" },
  { id: "a0000001-0000-4000-8000-000000000003", name: "박준호", lastSession: "05.30" },
  { id: "a0000001-0000-4000-8000-000000000004", name: "최서윤", lastSession: "05.29" },
  { id: "a0000001-0000-4000-8000-000000000005", name: "정하늘", lastSession: "05.28" },
];
