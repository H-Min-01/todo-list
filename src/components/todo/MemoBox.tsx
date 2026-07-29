"use client";

import { useState } from "react";
import { useKeyboardFocus } from "@/lib/useKeyboardFocus";

interface MemoBoxProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * 메모 영역. memo-paper.svg(줄노트 배경, 32px 간격)를 배경으로 깔고
 * 그 위에 투명 textarea를 겹쳐 line-height를 배경 줄과 맞춘다.
 *
 * 포커스 링은 실제 키보드 포커스일 때만 노출한다(useKeyboardFocus 참고).
 */
export function MemoBox({ value, onChange }: MemoBoxProps) {
  const isKeyboard = useKeyboardFocus();
  const [focused, setFocused] = useState(false);

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
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="메모를 입력해주세요"
        aria-label="메모"
        className={`absolute inset-0 top-[54px] h-[calc(100%-54px)] w-full cursor-text resize-none bg-transparent px-6 text-center text-base leading-8 text-slate-800 outline-none placeholder:text-slate-400 ${
          focused && isKeyboard ? "ring-2 ring-inset ring-slate-400" : ""
        }`}
      />
    </div>
  );
}
