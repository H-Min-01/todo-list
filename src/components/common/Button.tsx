import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "light" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  light: "bg-slate-200 text-slate-900 hover:bg-lime-300",
  danger: "bg-rose-500 text-white",
};

/**
 * 시안의 "하드 섀도우" 버튼. box-shadow 대신 뒤에 깔린 slate-900 pill을
 * 4px 오프셋으로 노출시키고, 클릭 시 앞면이 뒤로 붙어 눌린 느낌을 낸다.
 */
export function Button({
  variant = "light",
  icon,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`group relative inline-flex shrink-0 ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-x-1 translate-y-1 rounded-full bg-slate-900"
      />
      <span
        className={`relative z-10 inline-flex h-14 items-center justify-center gap-1 whitespace-nowrap rounded-full border-2 border-slate-900 px-6 text-base font-bold transition-transform group-active:translate-x-1 group-active:translate-y-1 ${VARIANT_CLASSES[variant]}`}
      >
        {icon}
        {children}
      </span>
    </button>
  );
}
