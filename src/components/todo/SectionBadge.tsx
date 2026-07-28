import Image from "next/image";

/** 홈페이지 "진행 중" / "완료" 섹션 제목에 쓰이는 스탬프 배지. */
export function SectionBadge({ type }: { type: "todo" | "done" }) {
  return type === "todo" ? (
    <Image
      src="/images/badges/badge-todo.svg"
      alt="TO DO"
      width={101}
      height={36}
    />
  ) : (
    <Image
      src="/images/badges/badge-done.svg"
      alt="DONE"
      width={97}
      height={36}
    />
  );
}
