import { useMutation, useQueryClient } from "react-query";
import { prayType } from "../type/prayType";

const usePutPrays = () => {
  const queryClient = useQueryClient();
  const putPray = async (prays: prayType[]) => {
    const res = await fetch("/api/pray/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prays.reverse()),
    });
    return res.json();
  };

  return useMutation(async (prays: prayType[]) => putPray(prays), {
    onMutate: async (newPrays) => {
      await queryClient.cancelQueries(["prayQuery"]);

      const oldPrays = queryClient.getQueryData(["prayQuery"]);

      queryClient.setQueryData(["prayQuery"], newPrays);

      return { oldPrays, newPrays };
    },
    onError: (_err, _newPray, context) => {
      queryClient.setQueryData(["prayQuery"], context?.oldPrays);
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

export default usePutPrays;
