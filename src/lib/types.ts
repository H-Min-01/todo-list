/**
 * Swagger 스펙(GET /items) 기준 — 목록 조회 응답은 요약 필드만 포함한다.
 */
export interface ItemSummary {
  id: number;
  name: string;
  isCompleted: boolean;
}

/**
 * Swagger 스펙(GET /items/{itemId}) 기준 — 상세 조회 응답.
 */
export interface Item {
  id: number;
  tenantId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}

export interface CreateItemDto {
  name: string;
}

export interface UpdateItemDto {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

export interface ImageUploadResponse {
  url: string;
}
