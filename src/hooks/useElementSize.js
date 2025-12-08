// hooks/useElementSize.js
import { useMemo } from "react";

export function useElementSize(element) {
  return useMemo(() => {
    const defaults = {
      text: { width: 200, height: 100 },
      header: { width: 300, height: 50 },
      table: { width: 400, height: 150 },
      image: { width: 200, height: 150 },
      line: { width: 200, height: 2 },
      list: { width: 200, height: 120 },
      link: { width: 150, height: 30 }
    };

    return {
      width: element.width || defaults[element.type]?.width || 200,
      height: element.height || defaults[element.type]?.height || 100
    };
  }, [element.type, element.width, element.height]);
}