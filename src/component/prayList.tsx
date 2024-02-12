import React from "react";
import { SortableContainer, SortableContainerProps } from "react-sortable-hoc";
import { prayType } from "../type/prayType";
import PrayItem from "./prayItem";
import { arrayMoveImmutable } from "array-move";
import usePutPray from "../hook/usePutPrays";
import styled from "styled-components";

const UL = styled.ul`
  padding: 0;
`;

interface prayListProps {
  prays: prayType[];
}

const Container: React.ComponentClass<SortableContainerProps & prayListProps> =
  SortableContainer(({ prays }: prayListProps) => {
    return (
      <UL>
        {prays.map((pray: prayType, i: number) => (
          <PrayItem pray={pray} index={i} key={pray.prayId} />
        ))}
      </UL>
    );
  });

const prayList = ({ prays }: prayListProps) => {
  const usePutPraysMutate = usePutPray();
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const newArr = arrayMoveImmutable(prays!, oldIndex, newIndex);
    usePutPraysMutate.mutateAsync(newArr);
  };
  return <Container prays={prays} onSortEnd={onSortEnd} />;
};

export default prayList;
