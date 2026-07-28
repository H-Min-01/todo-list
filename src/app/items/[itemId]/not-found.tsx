import Link from "next/link";
import { Header } from "@/components/common/Header";

export default function ItemNotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center">
        <p className="text-lg font-bold text-slate-900">
          해당 할 일을 찾을 수 없어요.
        </p>
        <Link href="/" className="text-sm text-violet-600 underline">
          목록으로 돌아가기
        </Link>
      </main>
    </>
  );
}
