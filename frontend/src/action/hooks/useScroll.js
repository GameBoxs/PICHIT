import { useEffect, useState, useRef } from "react";
import debounce from "lodash/debounce";

export function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [isMove, setIsMove] = useState(true);
  const element = useRef(null);

  const listener = () => {
    const current = window.pageYOffset;
    if (scrollY <= current) {
      setIsMove(true);
    } else {
      setIsMove(false);
    }
    setScrollY(current);
  };

  useEffect(() => {
    if (isMove)
      element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [scrollY]);

  const delay = 8;

  useEffect(() => {
    window.addEventListener("scroll", debounce(listener, delay));

    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return { scrollY, element };
}
