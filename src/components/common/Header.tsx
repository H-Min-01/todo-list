import Image from "next/image";

/**
 * 전역 헤더(GNB). 로고는 Next.js Link가 아닌 일반 <a>를 사용해
 * 클릭 시 항상 전체 새로고침으로 '/'로 이동한다(요구사항).
 */
export function Header() {
  return (
    <header className="h-[60px] w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-full max-w-[1200px] items-center px-4 tablet:px-6">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- 요구사항: 로고 클릭 시 항상 전체 새로고침 */}
        <a href="/" aria-label="do it 홈으로 이동">
          <Image
            src="/images/logo/logo-small.svg"
            alt="do it"
            width={71}
            height={40}
            priority
            className="block tablet:hidden"
          />
          <Image
            src="/images/logo/logo-large.svg"
            alt="do it"
            width={151}
            height={40}
            priority
            className="hidden tablet:block"
          />
        </a>
      </div>
    </header>
  );
}
