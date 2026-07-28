import Image from "next/image";

/** 진행 중/완료 목록이 비어있을 때 표시되는 일러스트. 모바일은 Small, 그 외는 Large. */
export function EmptyState({ type }: { type: "todo" | "done" }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
      <Image
        src={`/images/illustrations/empty-${type}-small.svg`}
        alt=""
        width={120}
        height={120}
        className="block tablet:hidden"
      />
      <Image
        src={`/images/illustrations/empty-${type}-large.svg`}
        alt=""
        width={240}
        height={240}
        className="hidden tablet:block"
      />
      <p className="mt-2 text-sm">
        아직 등록된 할 일이 없어요.
        <br />할 일을 추가해 보세요!
      </p>
    </div>
  );
}
