"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { uploadImage } from "@/lib/api";

interface ImageUploadBoxProps {
  imageUrl: string | null;
  onChange: (url: string) => void;
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
/** 영문/숫자/일부 특수문자 + 이미지 확장자만 허용 (한글/공백 등 비영문 파일명 차단) */
const ENGLISH_FILENAME_REGEX = /^[a-zA-Z0-9._-]+\.(jpg|jpeg|png|gif|webp)$/i;
/** 브라우저가 제공하는 MIME 타입이 허용 목록에 포함되는지 확인한다. */
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

/**
 * 상세 페이지 이미지 첨부 영역. 파일명이 영문 규칙을 만족하고
 * 5MB 이하인 경우에만 업로드를 진행한다.
 */
export function ImageUploadBox({ imageUrl, onChange }: ImageUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);

    if (!ENGLISH_FILENAME_REGEX.test(file.name)) {
      setError("파일 이름은 영문/숫자로만 이루어져야 합니다.");
      return;
    }
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setError("JPG, PNG, GIF, WEBP 이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    setUploading(true);
    try {
      const { url } = await uploadImage(file);
      onChange(url);
    } catch {
      setError("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- 외부 업로드 URL, next/image 도메인 설정 불필요
          <img
            src={imageUrl}
            alt="첨부 이미지"
            className="size-full object-cover"
          />
        ) : (
          <Image
            src="/images/icons/icon-image-placeholder.svg"
            alt=""
            width={64}
            height={64}
          />
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          aria-label={imageUrl ? "이미지 수정" : "이미지 추가"}
          className="absolute bottom-4 right-4 flex size-12 cursor-pointer items-center justify-center rounded-full bg-slate-900/50 outline-none backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {imageUrl ? (
            <Image
              src="/images/icons/icon-edit.svg"
              alt=""
              width={24}
              height={24}
            />
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 8L14 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 14L8 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
}
