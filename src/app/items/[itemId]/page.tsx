import { notFound } from "next/navigation";
import { Header } from "@/components/common/Header";
import { TodoDetailClient } from "@/components/todo/TodoDetailClient";
import { ApiError, getItem } from "@/lib/api";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await params;
  const id = Number(itemId);
  if (Number.isNaN(id)) notFound();

  const item = await getItem(id).catch((error) => {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  });

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <TodoDetailClient item={item} />
      </main>
    </>
  );
}
