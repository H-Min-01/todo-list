"use client";

import { useState, type InputHTMLAttributes } from "react";
import { useKeyboardFocus } from "@/lib/useKeyboardFocus";

/**
 * 시안의 검색/입력창 스펙(figma/reference/search-reference.svg)을 그대로 재현한
 * 하드 섀도우 입력창. 정적 이미지 대신 실제 <input>으로 구현한다.
 *
 * 텍스트 입력은 브라우저가 마우스 클릭 포커스에도 :focus-visible을 매칭시키므로,
 * 실제 키보드 포커스일 때만 링이 보이도록 useKeyboardFocus로 직접 구분한다.
 */
export function TextField({
  className = "",
  onFocus,
  onBlur,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  const isKeyboard = useKeyboardFocus();
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0 translate-x-1 translate-y-1 rounded-full bg-slate-900"
      />
      <input
        {...rest}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        className={`relative z-10 h-14 w-full cursor-text rounded-full border-2 border-slate-900 bg-slate-100 px-6 text-base text-slate-900 outline-none placeholder:text-slate-400 ${
          focused && isKeyboard ? "ring-2 ring-slate-400 ring-offset-2" : ""
        }`}
      />
    </div>
  );
}
