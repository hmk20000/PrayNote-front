import { arrayMoveImmutable } from "array-move";
import React, { useState } from "react";
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
} from "react-sortable-hoc";

const SortableItem: React.ComponentClass<
  SortableElementProps & { value: string }
> = SortableElement(({ value }: { value: string }) => <li>{value}</li>);

const SortableList: React.ComponentClass<
  SortableContainerProps & { items: string[] }
> = SortableContainer(({ items }: { items: string[] }) => {
  return (
    <ul>
      {items.map((value: string, index: number) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

const MySortableList = () => {
  const [myList, setMyList] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setMyList(arrayMoveImmutable(myList, oldIndex, newIndex));
  };
  return <SortableList items={myList} onSortEnd={onSortEnd} />;
};

export default MySortableList;
