import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { DataType, TeamType } from "../../mouseEvent/type/model";

export type FrameProps = {
  team: TeamType;
  data: DataType;
  setData: Dispatch<SetStateAction<DataType>>;
  children?: ReactNode;
  outerStyle: string;
  innerStyle: string;
  outerKey: string;
  setIsElementDragg: Dispatch<SetStateAction<boolean>>
};
