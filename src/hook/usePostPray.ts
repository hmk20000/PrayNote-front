import { useMutation, useQueryClient } from "react-query";
import { prayPacket } from "../type/prayType";

const usePostPray = () => {
  const queryClient = useQueryClient();

  const addPray = async (data: prayPacket) => {
    const res = await fetch("/api/pray", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  };

  return useMutation(async (data: prayPacket) => addPray(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["prayQuery"]);
    },
    onError: (error: any) => {
      throw error;
    },
  });
};

export default usePostPray;
