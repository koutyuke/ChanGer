import type { Dispatch, SetStateAction, MouseEvent as reactMouse } from "react";
import type { DataType } from "./type/model";

const mouseMove = (
  event: reactMouse | MouseEvent,
  data: DataType,
  setData: Dispatch<SetStateAction<DataType>>
) => {
  const newData = data;
  if (newData.IsDragg && newData.cloneElement !== null) {
    newData.cloneElement.style.top = `${
      event.pageY - newData.elementCursorPointY
    }px`;
    newData.cloneElement.style.left = `${
      event.pageX - newData.elementCursorPointX
    }px`;
    setData(newData);
  }
};

export default mouseMove;
