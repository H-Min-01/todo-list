import localFont from "next/font/local";

/**
 * NanumSquare 웹폰트 (Figma 시안 폰트, Text Style 미등록 — 노드별 개별 적용값 기준).
 * 3개 굵기만 사용: Regular(400) / Bold(700) / ExtraBold(800).
 */
export const nanumSquare = localFont({
  src: [
    {
      path: "../../public/fonts/NanumSquareR.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquareB.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquareEB.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-nanum-square",
  display: "swap",
});
