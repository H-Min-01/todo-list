"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Checkbox } from "@/components/common/Checkbox";
import { ImageUploadBox } from "@/components/todo/ImageUploadBox";
import { MemoBox } from "@/components/todo/MemoBox";
import { deleteItem, updateItem } from "@/lib/api";
import { useKeyboardFocus } from "@/lib/useKeyboardFocus";
import type { Item } from "@/lib/types";

/** 할 일 상세/수정/삭제 페이지의 상태와 액션을 담당하는 클라이언트 컴포넌트. */
export function TodoDetailClient({ item }: { item: Item }) {
  const router = useRouter();
  const [name, setName] = useState(item.name);
  const [isCompleted, setIsCompleted] = useState(item.isCompleted);
  const [memo, setMemo] = useState(item.memo ?? "");
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const isKeyboard = useKeyboardFocus();
  const [nameFocused, setNameFocused] = useState(false);

  const isDirty =
    name !== item.name ||
    isCompleted !== item.isCompleted ||
    memo !== (item.memo ?? "") ||
    imageUrl !== item.imageUrl;

  const handleSave = async () => {
    setSaving(true);
    setActionError(null);
    try {
      await updateItem(item.id, {
        name,
        isCompleted,
        memo,
        imageUrl: imageUrl ?? undefined,
      });
      router.push("/");
    } catch {
      setActionError("수정 사항을 저장하지 못했습니다. 다시 시도해주세요.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setActionError(null);
    try {
      await deleteItem(item.id);
      router.push("/");
    } catch {
      setActionError("할 일을 삭제하지 못했습니다. 다시 시도해주세요.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-8 tablet:px-6">
      <div
        className={`flex h-14 items-center gap-4 rounded-full border-2 border-slate-900 px-4 ${
          isCompleted ? "bg-violet-100" : "bg-white"
        }`}
      >
        <Checkbox
          checked={isCompleted}
          onChange={() => setIsCompleted((prev) => !prev)}
          aria-label="완료 상태 토글"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setNameFocused(true)}
          onBlur={() => setNameFocused(false)}
          aria-label="할 일 이름"
          className={`w-full cursor-text rounded-sm bg-transparent text-base font-bold underline decoration-2 underline-offset-4 outline-none ${
            nameFocused && isKeyboard ? "ring-2 ring-slate-400" : ""
          } ${isCompleted ? "text-violet-600" : "text-slate-900"}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 desktop:grid-cols-2">
        <ImageUploadBox imageUrl={imageUrl} onChange={setImageUrl} />
        <MemoBox value={memo} onChange={setMemo} />
      </div>

      <div className="flex justify-center gap-3">
        <Button
          variant="light"
          tone={isDirty ? "lime" : undefined}
          onClick={handleSave}
          disabled={saving || deleting}
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M2 7L6.5 11.5L14 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          수정 완료
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={saving || deleting}
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M4 4L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 4L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          }
        >
          삭제하기
        </Button>
      </div>
      {actionError && (
        <p role="alert" className="text-center text-sm text-rose-500">
          {actionError}
        </p>
      )}
    </div>
  );
}
