"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { TextField } from "@/components/common/TextField";

/** 원본 아이콘은 흰색 고정이라 밝은 버튼 위에서 보이지 않아, 동일 path를 currentColor로 재구현한다. */
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2 8L14 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 14L8 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface TodoInputProps {
  onAdd: (name: string) => Promise<void> | void;
}

/** 상단 할 일 입력창. 버튼 클릭과 Enter 키 두 가지 방식 모두 할 일을 추가한다. */
export function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const name = value.trim();
    if (!name || submitting) return;
    setSubmitting(true);
    try {
      await onAdd(name);
      setValue("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full gap-3">
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            void handleSubmit();
          }
        }}
        placeholder="할 일을 입력해주세요"
        aria-label="할 일 입력"
      />
      <Button
        variant="light"
        tone={value.trim() ? "violet" : undefined}
        onClick={handleSubmit}
        disabled={submitting}
        icon={<PlusIcon />}
      >
        추가하기
      </Button>
    </div>
  );
}
