interface MemoBoxProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * 메모 영역. memo-paper.svg(줄노트 배경, 32px 간격)를 배경으로 깔고
 * 그 위에 투명 textarea를 겹쳐 line-height를 배경 줄과 맞춘다.
 */
export function MemoBox({ value, onChange }: MemoBoxProps) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[url('/images/backgrounds/memo-paper.svg')] bg-cover bg-center"
    >
      <span className="absolute left-0 right-0 top-[22px] text-center text-base font-bold text-amber-800">
        Memo
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="메모를 입력해주세요"
        aria-label="메모"
        className="absolute inset-0 top-[54px] h-[calc(100%-54px)] w-full resize-none bg-transparent px-6 text-center text-base leading-8 text-slate-800 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-600"
      />
    </div>
  );
}
