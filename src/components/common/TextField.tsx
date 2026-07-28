import type { InputHTMLAttributes } from "react";

/**
 * 시안의 검색/입력창 스펙(figma/reference/search-reference.svg)을 그대로 재현한
 * 하드 섀도우 입력창. 정적 이미지 대신 실제 <input>으로 구현한다.
 */
export function TextField({
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`relative w-full ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0 translate-x-1 translate-y-1 rounded-full bg-slate-900"
      />
      <input
        {...rest}
        className="relative z-10 h-14 w-full rounded-full border-2 border-slate-900 bg-slate-100 px-6 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
      />
    </div>
  );
}
