import { prayPacket } from "../type/prayType";
import usePostPray from "../hook/usePostPray";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.form`
  margin-bottom: 12px;
`;

// interface prayInsertProps {
//   prays: prayType[];
// }
const PrayInsert = () => {
  const usePostPrayMutate = usePostPray();
  const { register, handleSubmit, reset } = useForm<prayPacket>({
    mode: "onSubmit",
    defaultValues: { title: "", state: "before" },
  });
  const onSubmit = (data: prayPacket) => {
    if (data.state == "" || data.title == "") return;
    const packet: prayPacket = {
      state: data.state,
      title: data.title,
    };
    usePostPrayMutate.mutateAsync(packet);
    reset();
  };
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("title", { minLength: { value: 1, message: "error" } })}
      />
      <input
        type="hidden"
        {...register("state", { minLength: { value: 1, message: "error" } })}
      />
      <button type="submit">확인</button>
    </Container>
  );
};

export default PrayInsert;
