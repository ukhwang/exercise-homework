type WorkspaceHeaderProps = {
  trainerInitials?: string;
};

export function WorkspaceHeader({
  trainerInitials = "PT",
}: WorkspaceHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b-2 border-black bg-white px-4 py-4 text-black">
      <h1 className="text-xl font-bold tracking-tight">운동숙제</h1>
      <div
        className="flex h-10 w-10 items-center justify-center border-2 border-black bg-black text-sm font-bold text-white"
        aria-hidden
      >
        {trainerInitials}
      </div>
    </header>
  );
}
