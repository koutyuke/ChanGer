import type { Dispatch, SetStateAction } from "react";
import type { DataType } from "./type/model";

const mouseLeave = (
  data: DataType,
  setData: Dispatch<SetStateAction<DataType>>
) => {
  const newData = data;
  if (newData.IsDragg) {
    newData.enterElement = null;
    newData.enterInfo = null;
    setData(newData);
  }
};

export default mouseLeave;
