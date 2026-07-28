interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  "aria-label": string;
}

/**
 * 원형 완료 체크박스. 체크 시 violet-600으로 채워지고 흰 체크 아이콘이 표시된다
 * (상세 페이지 시안의 완료 상태 스크린샷 기준).
 */
export function Checkbox({ checked, onChange, ...rest }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      {...rest}
      className={`flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
        checked
          ? "border-violet-600 bg-violet-600"
          : "border-slate-900 bg-white"
      }`}
    >
      {checked && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path
            d="M2 7L6.5 11.5L14 4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
