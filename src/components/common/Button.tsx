import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "light" | "danger";
/** light variant에서만 의미 있는 강조색. 값이 있으면 slate-200 기본색 대신 이 톤을 쓴다. */
type ButtonTone = "violet" | "lime";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  icon?: ReactNode;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  light: "bg-slate-200 text-slate-900",
  danger: "bg-rose-500 text-white",
};

/** 입력값 존재(violet) / 수정 사항 존재(lime) 같은 "상태 강조" 색상. hover로는 바뀌지 않는다. */
const TONE_CLASSES: Record<ButtonTone, string> = {
  violet: "bg-violet-600 text-white",
  lime: "bg-lime-300 text-slate-900",
};

/**
 * 시안의 "하드 섀도우" 버튼. box-shadow 대신 뒤에 깔린 slate-900 pill을
 * 4px 오프셋으로 노출시키고, 클릭/터치 중(:active)에만 앞면이 뒤로 붙어
 * 눌린 느낌을 낸다. hover로는 색이 바뀌지 않는다.
 */
export function Button({
  variant = "light",
  tone,
  icon,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`group relative inline-flex shrink-0 cursor-pointer disabled:cursor-not-allowed ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-x-1 translate-y-1 rounded-full bg-slate-900"
      />
      <span
        className={`relative z-10 inline-flex h-14 items-center justify-center gap-1 whitespace-nowrap rounded-full border-2 border-slate-900 px-6 text-base font-bold transition-transform group-active:translate-x-1 group-active:translate-y-1 ${tone ? TONE_CLASSES[tone] : VARIANT_CLASSES[variant]}`}
      >
        {icon}
        {children}
      </span>
    </button>
  );
}
