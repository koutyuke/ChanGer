import type { Dispatch, SetStateAction, MouseEvent as reactMouse } from "react";
import type { DataType, SelectMemberType } from "./type/model";

const mouseEnter = (
  event: reactMouse | MouseEvent,
  data: DataType,
  memberList: SelectMemberType[],
  setData: Dispatch<SetStateAction<DataType>>,
  setMemberList: Dispatch<SetStateAction<SelectMemberType[]>>,
  teamId: string
) => {
  if (data.IsDragg) {
    const newData = data;

    newData.enterElement = event.target as HTMLInputElement;

    newData.enterInfo = {
      memberList,
      setMemberList,
      memberData: null,
      teamId,
    };
    setData(newData);
  }
};

export default mouseEnter;
