import { useState } from "react";
import { prayType } from "../type/prayType";
import { useQuery } from "react-query";

const useGetPray = () => {
  const [prayData, setPrayData] = useState<prayType[]>();
  const getPrayAll = async (): Promise<prayType[]> => {
    const res = await fetch("/api/pray");
    return res.json();
  };
  const { isLoading } = useQuery(["prayQuery"], () => getPrayAll(), {
    onSuccess: (data) => {
      setPrayData(data);
    },
  });

  return { prayData, isPrayLoading: isLoading };
};

export default useGetPray;
