import React from "react";
import { SortableContainer, SortableContainerProps } from "react-sortable-hoc";
import { prayType } from "../type/prayType";
import PrayItem from "./prayItem";
import { arrayMoveImmutable } from "array-move";
import usePutPray from "../hook/usePutPrays";

interface prayListProps {
  prays: prayType[];
}

const Container: React.ComponentClass<SortableContainerProps & prayListProps> =
  SortableContainer(({ prays }: prayListProps) => {
    return (
      <ul>
        {prays.map((pray: prayType, i: number) => (
          <PrayItem pray={pray} index={i} key={pray.prayId} />
        ))}
      </ul>
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
