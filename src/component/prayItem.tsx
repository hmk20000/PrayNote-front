import styled from "styled-components";
import { prayPacket, prayType } from "../type/prayType";
import useDeletePray from "../hook/useDeletePray";
import { SortableElement, SortableElementProps } from "react-sortable-hoc";
import { useForm } from "react-hook-form";
import usePutPray from "../hook/usePutPray";
import debounce from "../util/debounce";

const Container = styled.li`
  width: 100%;
  border: 1px solid gray;
  border-radius: 12px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  background-color: white;
  list-style: none;
  margin: 0;
  display: flex;
  flex-direction: row;
`;
const DeleteBtn = styled.button`
  width: 12px;
  position: absolute;
  right: 10px;
  top: 0px;
`;
const ID = styled.div`
  font-size: 10px;
  background-color: #9c9c9c;
  color: white;
  width: 16px;
  height: 16px;
  text-align: center;
  border-radius: 100%;
`;
const Title = styled.input``;

interface prayItemProps {
  pray: prayType;
}
const PrayItem: React.ComponentClass<SortableElementProps & prayItemProps> =
  SortableElement(({ pray }: prayItemProps) => {
    const deletePrayMutate = useDeletePray();
    const updatePrayMutate = usePutPray();
    const { register, handleSubmit } = useForm<prayPacket>({
      mode: "onChange",
      defaultValues: { title: pray.title, state: pray.state },
    });
    const onClick = () => {
      deletePrayMutate.mutateAsync(pray.prayId);
    };

    const onChange = (data: prayPacket) => {
      console.log(data);
      const packet = { ...pray, title: data.title };
      updatePrayMutate.mutateAsync(packet);
    };
    const debouncedChange = debounce<typeof onChange>(onChange, 1000);
    return (
      <Container>
        <form onChange={handleSubmit(debouncedChange)}>
          <ID>{pray.prayId}</ID>
          <Title {...register("title")} />
        </form>
        <DeleteBtn
          onClick={() => {
            onClick();
          }}
        >
          X
        </DeleteBtn>
      </Container>
    );
  });

export default PrayItem;
