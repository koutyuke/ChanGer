import type { Dispatch, SetStateAction, MouseEvent as reactMouse } from "react";
import { DataType, SelectMemberType } from "./type/model";

const mouseDown = (
  event: reactMouse | MouseEvent,
  data: DataType,
  selectMember: SelectMemberType,
  memberList: SelectMemberType[],
  setData: Dispatch<SetStateAction<DataType>>,
  setMemberList: Dispatch<SetStateAction<SelectMemberType[]>>,
  teamId: string,
  setIsElementDragg: Dispatch<SetStateAction<boolean>>
) => {
  const target = event.target as HTMLInputElement;
  const newData = data;

  newData.IsDragg = true;
  setIsElementDragg(true)
  newData.element = target;
  newData.cloneElement = target.cloneNode(true) as HTMLInputElement;

  newData.shadowElement = document.createElement("div") as HTMLInputElement;
  newData.shadowElement.classList.add(
    "bg-gray-400",
    "rounded-lg",
    "select-none",
    `h-16`,
    `w-48`
  );
  newData.shadowElement.draggable = false;

  newData.elementCursorPointX = event.pageX - target.getBoundingClientRect().x;
  newData.elementCursorPointY = event.pageY - target.getBoundingClientRect().y;

  newData.cloneElement.style.top = `${target.getBoundingClientRect().top}px`;
  newData.cloneElement.style.left = `${target.getBoundingClientRect().left}px`;
  newData.cloneElement.classList.add(
    "border-2",
    "p-0.5",
    "border-blue-500",
    "pointer-events-none",
    "absolute",
    "z-10"
  );
  newData.cloneElement.classList.remove("p-1");

  newData.element.parentNode?.insertBefore(
    newData.shadowElement,
    newData.element
  );
  newData.element.parentNode?.insertBefore(
    newData.cloneElement,
    newData.element.nextSibling
  );

  newData.enterElement = target.parentElement?.parentNode as HTMLInputElement;

  newData.downInfo = {
    memberList,
    setMemberList,
    memberData: selectMember,
    teamId,
  };

  newData.enterInfo = {
    memberList,
    setMemberList,
    memberData: null,
    teamId,
  };
  newData.element.classList.add("hidden");
  setData(newData);
};

export default mouseDown;
