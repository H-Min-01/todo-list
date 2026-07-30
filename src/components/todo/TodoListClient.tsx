"use client";

import { useRef, useState } from "react";
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
  const [pendingIds, setPendingIds] = useState<Set<number>>(new Set());
  const [toggleError, setToggleError] = useState<string | null>(null);
  // 렌더 커밋 전에 같은 항목이 연타되면 pendingIds state가 아직 반영되지 않아
  // 중복 요청이 새어나갈 수 있어, 동기적으로 즉시 갱신되는 ref로 이중 요청을 막는다.
  const pendingIdsRef = useRef<Set<number>>(new Set());

  const handleAdd = async (name: string) => {
    const created = await createItem({ name });
    setItems((prev) => [
      ...prev,
      { id: created.id, name: created.name, isCompleted: created.isCompleted },
    ]);
  };

  const handleToggle = async (id: number) => {
    // 같은 항목에 대한 요청이 이미 진행 중이면 무시해 PATCH 순서가 뒤바뀌지 않게 한다.
    if (pendingIdsRef.current.has(id)) return;
    const target = items.find((item) => item.id === id);
    if (!target) return;
    const nextCompleted = !target.isCompleted;

    setToggleError(null);
    pendingIdsRef.current.add(id);
    setPendingIds((prev) => new Set(prev).add(id));
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
      setToggleError("상태를 변경하지 못했습니다. 다시 시도해주세요.");
    } finally {
      pendingIdsRef.current.delete(id);
      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const todoItems = items.filter((item) => !item.isCompleted);
  const doneItems = items.filter((item) => item.isCompleted);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-8 tablet:px-6">
      <TodoInput onAdd={handleAdd} />
      {toggleError && (
        <p role="alert" className="-mt-4 text-sm text-rose-500">
          {toggleError}
        </p>
      )}

      <div className="grid grid-cols-1 gap-8 desktop:grid-cols-2">
        <section className="flex flex-col gap-4">
          <SectionBadge type="todo" />
          {todoItems.length === 0 ? (
            <EmptyState type="todo" />
          ) : (
            <ul className="flex flex-col gap-3">
              {todoItems.map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  onToggle={handleToggle}
                  disabled={pendingIds.has(item.id)}
                />
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
                <TodoItem
                  key={item.id}
                  item={item}
                  onToggle={handleToggle}
                  disabled={pendingIds.has(item.id)}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
