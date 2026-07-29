"use client";

import { useEffect, useState } from "react";

/**
 * 텍스트류 입력 요소는 브라우저가 마우스 클릭으로 포커스돼도 :focus-visible을
 * 그대로 매칭시켜서, CSS만으로는 "키보드로 포커스했을 때만" 링을 보여줄 수 없다.
 * 그래서 Tab 키 입력과 포인터 입력을 직접 추적해 실제 입력 방식을 구분한다.
 */
export function useKeyboardFocus() {
  const [isKeyboard, setIsKeyboard] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") setIsKeyboard(true);
    };
    const handlePointerDown = () => setIsKeyboard(false);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  return isKeyboard;
}
