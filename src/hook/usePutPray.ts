import { useMutation, useQueryClient } from "react-query";
import { prayType } from "../type/prayType";

const usePutPray = () => {
  const queryClient = useQueryClient();
  const putPray = async (pray: prayType) => {
    const res = await fetch("/api/pray/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pray),
    });
    return res.json();
  };

  return useMutation(async (pray: prayType) => putPray(pray), {
    onMutate: async (newPray) => {
      await queryClient.cancelQueries(["prayQuery"]);

      const oldPray = queryClient.getQueryData(["prayQuery"]);

      queryClient.setQueryData(["prayQuery"], newPray);

      return { oldPray, newPray };
    },
    onError: (_err, _newPray, context) => {
      queryClient.setQueryData(["prayQuery"], context?.oldPray);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["prayQuery"]);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["prayQuery"]);
    // },
    // onError: (error: any) => {
    //   throw error;
    // },
  });
};

export default usePutPray;
