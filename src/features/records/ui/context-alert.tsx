import { BrutalAlert } from "@/shared/ui/design-system/alert";

type ContextAlertProps = {
  clientName: string;
  hardestExercise: string;
};

export function ContextAlert({ clientName, hardestExercise }: ContextAlertProps) {
  return (
    <div className="bg-black p-4" aria-live="polite">
      <BrutalAlert>
        <strong>{clientName}님</strong> 지난 숙제에서
        <br />
        <strong>&quot;{hardestExercise}&quot;</strong>이 가장 힘들었어요
      </BrutalAlert>
    </div>
  );
}
