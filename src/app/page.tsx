import { Header } from "@/components/common/Header";
import { TodoListClient } from "@/components/todo/TodoListClient";
import { getItems } from "@/lib/api";

// 매 요청마다 최신 할 일 목록을 가져와야 하므로 정적 프리렌더링을 끈다.
export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await getItems();

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <TodoListClient initialItems={items} />
      </main>
    </>
  );
}
