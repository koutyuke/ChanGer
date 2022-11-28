import NameCard from "components/NameCard";
import { FC, useState } from "react";
import mouseDown from "../mouseEvent/MouseDown";
import mouseEnter from "../mouseEvent/MouseEnter";
import mouseLeave from "../mouseEvent/MouseLeave";
import type { FrameProps } from "./type/model";

const AreaFrame: FC<FrameProps> = ({
  team,
  data,
  setData,
  children,
  outerStyle,
  innerStyle,
  outerKey,
  setIsElementDragg
}) => {
  const [itemList, setItemList] = useState(team.selectMember);
  return (
    <div
      key={outerKey}
      className={`${outerStyle} flex w-full flex-col items-center space-y-3 rounded-lg border-[3px] border-transparent p-4`}
      onMouseEnter={(event) =>
        mouseEnter(
          event,
          data,
          itemList,
          setData,
          setItemList,
          team.connectChannelId
        )
      }
      onMouseLeave={() => mouseLeave(data, setData)}
    >
      {children}

      <div
        className={`${innerStyle} grid h-auto min-h-[3rem] w-full min-w-[13rem] grid-cols-[repeat(auto-fit,12rem)] flex-col items-center justify-center gap-2 rounded-lg p-4`}
      >
        {itemList.map((item) => {
          const { name, discriminator, iconUrl } = item;
          return (
            <NameCard
              iconUrl={iconUrl}
              name={name}
              discriminator={discriminator}
              nameStyle="w-[124px]"
              baseStyle="w-48 bg-[#fd986d]"
              key={`${name}#${discriminator}`}
              onMouseDown={(event) =>
                mouseDown(
                  event,
                  data,
                  item,
                  itemList,
                  setData,
                  setItemList,
                  team.connectChannelId,
                  setIsElementDragg
                )
              }
              role="button"
              tabIndex={0}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AreaFrame;
