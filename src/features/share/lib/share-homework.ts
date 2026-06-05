const SHARE_TITLE = "운동숙제";
const SHARE_TEXT = "오늘의 운동 숙제가 도착했습니다.";

export function buildHomeworkShareUrl(magicToken: string): string {
  return `${window.location.origin}/h/${magicToken}`;
}

/**
 * Web Share API 우선, 미지원/취소/실패 시 클립보드 복사 폴백
 */
export async function shareHomeworkLink(
  shareUrl: string,
  onCopied: () => void
): Promise<void> {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({
        title: SHARE_TITLE,
        text: SHARE_TEXT,
        url: shareUrl,
      });
      return;
    } catch {
      // 사용자 취소 또는 share 실패 → 클립보드 폴백
    }
  }

  try {
    await navigator.clipboard.writeText(shareUrl);
    onCopied();
  } catch {
    onCopied();
  }
}
