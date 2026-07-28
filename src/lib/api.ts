import type {
  CreateItemDto,
  ImageUploadResponse,
  Item,
  ItemSummary,
  UpdateItemDto,
} from "./types";

const API_ROOT = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

if (!TENANT_ID) {
  throw new Error("NEXT_PUBLIC_TENANT_ID 환경변수가 설정되지 않았습니다.");
}

const BASE_URL = `${API_ROOT}/${TENANT_ID}`;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers:
      init?.body && !(init.body instanceof FormData)
        ? { "Content-Type": "application/json", ...init.headers }
        : init?.headers,
  });

  if (!res.ok) {
    throw new ApiError(`요청에 실패했습니다. (${res.status})`, res.status);
  }

  return res.json() as Promise<T>;
}

/** 할 일 목록을 조회한다. 페이지네이션 없이 전체를 한 번에 가져온다. */
export function getItems(): Promise<ItemSummary[]> {
  return request<ItemSummary[]>(`/items?page=1&pageSize=999`);
}

/** 할 일 상세를 조회한다. */
export function getItem(itemId: number): Promise<Item> {
  return request<Item>(`/items/${itemId}`);
}

/** 할 일을 새로 생성한다. */
export function createItem(dto: CreateItemDto): Promise<Item> {
  return request<Item>(`/items`, {
    method: "POST",
    body: JSON.stringify(dto),
  });
}

/** 할 일 이름/상태/메모/이미지를 수정한다. */
export function updateItem(itemId: number, dto: UpdateItemDto): Promise<Item> {
  return request<Item>(`/items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}

/** 할 일을 삭제한다. */
export function deleteItem(itemId: number): Promise<{ message: string }> {
  return request<{ message: string }>(`/items/${itemId}`, {
    method: "DELETE",
  });
}

/** 이미지를 업로드하고 접근 가능한 URL을 받는다. (서버 측 5MB 제한) */
export function uploadImage(file: File): Promise<ImageUploadResponse> {
  const formData = new FormData();
  formData.append("image", file);
  return request<ImageUploadResponse>(`/images/upload`, {
    method: "POST",
    body: formData,
  });
}
