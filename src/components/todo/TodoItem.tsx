"use client";

import Link from "next/link";
import { Checkbox } from "@/components/common/Checkbox";
import type { ItemSummary } from "@/lib/types";

interface TodoItemProps {
  item: ItemSummary;
  onToggle: (id: number) => void;
}

/**
 * 할 일 목록의 한 행. 체크박스를 클릭하면 완료 상태를 토글하고,
 * 텍스트 영역을 클릭하면 상세 페이지로 이동한다.
 */
export function TodoItem({ item, onToggle }: TodoItemProps) {
  return (
    <li
      className={`flex h-[50px] items-center gap-4 rounded-[27px] border-2 border-slate-900 px-3 ${
        item.isCompleted ? "bg-violet-100" : "bg-white"
      }`}
    >
      <Checkbox
        checked={item.isCompleted}
        onChange={() => onToggle(item.id)}
        aria-label={`${item.name} 완료 상태 토글`}
      />
      <Link
        href={`/items/${item.id}`}
        className={`truncate text-base ${
          item.isCompleted
            ? "text-violet-600 line-through"
            : "text-slate-800"
        }`}
      >
        {item.name}
      </Link>
    </li>
  );
}
