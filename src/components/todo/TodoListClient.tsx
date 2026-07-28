"use client";

import { useState } from "react";
import { TodoInput } from "@/components/todo/TodoInput";
import { TodoItem } from "@/components/todo/TodoItem";
import { SectionBadge } from "@/components/todo/SectionBadge";
import { EmptyState } from "@/components/todo/EmptyState";
import { createItem, updateItem } from "@/lib/api";
import type { ItemSummary } from "@/lib/types";

interface TodoListClientProps {
  initialItems: ItemSummary[];
}

/** 할 일 목록 페이지의 상태(추가/토글)를 관리하는 클라이언트 컴포넌트. */
export function TodoListClient({ initialItems }: TodoListClientProps) {
  const [items, setItems] = useState(initialItems);

  const handleAdd = async (name: string) => {
    const created = await createItem({ name });
    setItems((prev) => [
      ...prev,
      { id: created.id, name: created.name, isCompleted: created.isCompleted },
    ]);
  };

  const handleToggle = async (id: number) => {
    const target = items.find((item) => item.id === id);
    if (!target) return;
    const nextCompleted = !target.isCompleted;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: nextCompleted } : item,
      ),
    );
    try {
      await updateItem(id, { isCompleted: nextCompleted });
    } catch {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isCompleted: !nextCompleted } : item,
        ),
      );
    }
  };

  const todoItems = items.filter((item) => !item.isCompleted);
  const doneItems = items.filter((item) => item.isCompleted);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-8 tablet:px-6">
      <TodoInput onAdd={handleAdd} />

      <div className="grid grid-cols-1 gap-8 desktop:grid-cols-2">
        <section className="flex flex-col gap-4">
          <SectionBadge type="todo" />
          {todoItems.length === 0 ? (
            <EmptyState type="todo" />
          ) : (
            <ul className="flex flex-col gap-3">
              {todoItems.map((item) => (
                <TodoItem key={item.id} item={item} onToggle={handleToggle} />
              ))}
            </ul>
          )}
        </section>

        <section className="flex flex-col gap-4">
          <SectionBadge type="done" />
          {doneItems.length === 0 ? (
            <EmptyState type="done" />
          ) : (
            <ul className="flex flex-col gap-3">
              {doneItems.map((item) => (
                <TodoItem key={item.id} item={item} onToggle={handleToggle} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
