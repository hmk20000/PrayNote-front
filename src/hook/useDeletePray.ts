import { useMutation, useQueryClient } from "react-query";

const useDeletePray = () => {
  const queryClient = useQueryClient();
  const deletePray = async (prayId: number) => {
    const res = await fetch("/api/pray/" + prayId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.json();
  };

  return useMutation(async (prayId: number) => deletePray(prayId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["prayQuery"]);
    },
    onError: (error: any) => {
      throw error;
    },
  });
};

export default useDeletePray;
