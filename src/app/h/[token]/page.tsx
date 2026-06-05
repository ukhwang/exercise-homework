import { HomeworkPageClient } from "@/features/magic-link/ui/homework-page-client";
import { getHomeworkByToken } from "@/features/magic-link/lib/get-homework-by-token";

type HomeworkPageProps = {
  params: Promise<{ token: string }>;
};

export default async function HomeworkPage({ params }: HomeworkPageProps) {
  const { token } = await params;
  const homework = await getHomeworkByToken(token);

  if (!homework) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center border-4 border-black bg-white px-6 text-center">
        <p className="text-2xl font-black uppercase">링크를 찾을 수 없습니다</p>
        <p className="mt-4 text-sm font-bold uppercase text-black/70">
          올바른 숙제 링크인지 확인해 주세요.
        </p>
      </div>
    );
  }

  return <HomeworkPageClient token={token} homework={homework} />;
}
