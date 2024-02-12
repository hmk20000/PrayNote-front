import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [rtn, setRtn] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRtn(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return rtn;
}

export default useDebounce;
//https://lasbe.tistory.com/153
