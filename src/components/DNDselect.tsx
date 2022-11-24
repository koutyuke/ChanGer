import {
  Dispatch,
  FC,
  MouseEvent as reactMouse,
  SetStateAction,
  useState,
} from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export type DataType = {
  element: HTMLInputElement | null;
  cloneElement: HTMLInputElement | null;
  enterElement: HTMLInputElement | null;
  placeHolder: HTMLInputElement | null;
  IsDragg: boolean;
  first: boolean;
  downInfo: SelectTeamType | null;
  enterInfo: SelectTeamType | null;
  guildId: string;
};

export type SelectMemberType = {
  name: string;
  iconUrl: string;
  discriminator: string;
  memberId: string;
};

export type TeamType = {
  teamName: string | null;
  selectMember: SelectMemberType[];
  channelname: string;
  connectChannelId: string;
  guildId: string;
};

export type SelectTeamType = {
  memberList: SelectMemberType[];
  setMemberList: Dispatch<SetStateAction<SelectMemberType[]>>;
  // body: HTMLInputElement;
  memberData: SelectMemberType | null;
  teamId: string;
};

export type ListProps = {
  team: TeamType;
  data: DataType;
  setData: Dispatch<SetStateAction<DataType>>;
};

const mouseDown = (
  event: reactMouse | MouseEvent,
  data: DataType,
  selectMember: SelectMemberType,
  memberList: SelectMemberType[],
  setData: Dispatch<SetStateAction<DataType>>,
  setMemberList: Dispatch<SetStateAction<SelectMemberType[]>>,
  teamId: string
) => {
  const target = event.target as HTMLInputElement;
  const newData = data;

  newData.IsDragg = true;
  newData.element = target;
  newData.cloneElement = target.cloneNode(true) as HTMLInputElement;

  newData.placeHolder = document.createElement("div") as HTMLInputElement;
  newData.placeHolder.classList.add(
    "bg-gray-400",
    "rounded-lg",
    "select-none",
    `h-${newData.element.clientHeight / 4}`,
    `w-${newData.element.clientWidth / 4}`
  );
  newData.placeHolder.draggable = false;

  newData.cloneElement.style.top = `${
    event.pageY - newData.element.clientHeight / 2
  }px`;
  newData.cloneElement.style.left = `${
    event.pageX - newData.element.clientWidth / 2
  }px`;
  newData.cloneElement.classList.add(
    "border-2",
    "m-0",
    "border-orange-100",
    "pointer-events-none",
    "absolute",
    "z-10"
  );

  newData.element.parentNode?.insertBefore(
    newData.placeHolder,
    newData.element.nextSibling
  );
  newData.element.parentNode?.insertBefore(
    newData.cloneElement,
    newData.element.nextSibling
  );

  newData.enterElement = target.parentElement?.parentNode as HTMLInputElement;
  newData.enterElement.classList.add("border-red-300");
  newData.enterElement.classList.remove("border-transparent");

  newData.downInfo = {
    memberList,
    setMemberList,
    // body: target.parentNode?.parentNode as HTMLInputElement,
    memberData: selectMember,
    teamId,
  };

  newData.enterInfo = {
    memberList,
    setMemberList,
    // body: target.parentNode?.parentNode as HTMLInputElement,
    memberData: null,
    teamId,
  };
  newData.element.classList.add("hidden");
  setData(newData);
};

export const mouseMove = (
  event: reactMouse | MouseEvent,
  data: DataType,
  setData: Dispatch<SetStateAction<DataType>>
) => {
  const newData = data;
  if (newData.IsDragg && newData.cloneElement !== null) {
    newData.cloneElement.style.top = `${
      event.pageY - newData.cloneElement.clientHeight / 2
    }px`;
    newData.cloneElement.style.left = `${
      event.pageX - newData.cloneElement.clientWidth / 2
    }px`;
    setData(newData);
  }
};

export const mouseUp = (
  data: DataType,
  setData: Dispatch<SetStateAction<DataType>>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
) => {
  const newData = data;

  newData.placeHolder?.remove();
  newData.cloneElement?.remove();
  newData.element?.classList.remove("hidden");
  newData.IsDragg = false;
  newData.enterElement?.classList.add("border-transparent");
  newData.enterElement?.classList.remove("border-red-300");

  if (
    newData.enterInfo !== null &&
    newData.downInfo !== null &&
    newData.enterInfo.setMemberList !== newData.downInfo.setMemberList &&
    newData.downInfo.memberData
  ) {
    socket.emit("change-member", {
      memberId: newData.downInfo.memberData?.memberId,
      
      connectId: newData.enterInfo.teamId,
      guildId: newData.guildId,
    });

    newData.enterInfo?.setMemberList([
      ...newData.enterInfo.memberList,
      newData.downInfo.memberData,
    ]);
    newData.downInfo.setMemberList([
      ...newData.downInfo.memberList.filter(
        (value) => value !== newData.downInfo?.memberData
      ),
    ]);
  }
  setData(newData);
};

const mouseEnter = (
  event: reactMouse | MouseEvent,
  data: DataType,
  memberList: SelectMemberType[],
  setData: Dispatch<SetStateAction<DataType>>,
  setMemberList: Dispatch<SetStateAction<SelectMemberType[]>>,
  teamId: string
) => {
  if (data.IsDragg) {
    // const target = event.target as HTMLInputElement;
    const newData = data;

    newData.enterElement = event.target as HTMLInputElement;
    newData.enterElement.classList.add("border-red-300");
    newData.enterElement.classList.remove("border-transparent");

    newData.enterInfo = {
      memberList,
      setMemberList,
      // body: target,
      memberData: null,
      teamId,
    };
    setData(newData);
  }
};

const mouseLeave = (
  data: DataType,
  setData: Dispatch<SetStateAction<DataType>>
) => {
  const newData = data;
  if (newData.IsDragg) {
    newData.enterElement?.classList.add("border-transparent");
    newData.enterElement?.classList.remove("border-red-300");
    newData.enterElement = null;

    newData.enterInfo = null;
    setData(newData);
  }
};

export const SelectTeamBox: FC<ListProps> = ({ team, data, setData }) => {
  const [itemList, setItemList] = useState(team.selectMember);

  return (
    <div
      key={`#${team.guildId}#${team.connectChannelId}`}
      className="flex w-full flex-col items-center space-y-3 rounded-lg border-[3px] border-transparent bg-gray-100 p-4 "
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
      <div className="flex h-10 w-full select-none items-center justify-center rounded-lg bg-[#79d5a3] text-center text-2xl text-white">
        <div className="">{team.teamName ?? team.channelname}</div>
      </div>
      <div className="grid min-h-[3rem] w-full min-w-[13rem] grid-cols-[repeat(auto-fit,12rem)] flex-col items-center justify-center gap-2 rounded-lg bg-gray-300 p-4 ">
        {itemList.map((item) => {
          const { name, discriminator, iconUrl } = item;
          return (
            <div
              key={`${name}#${discriminator}`}
              className="scroll-hidden flex h-16 w-48 cursor-pointer select-none items-center justify-center truncate rounded-lg bg-[#fd986d] text-center"
              onMouseDown={(event) =>
                mouseDown(
                  event,
                  data,
                  item,
                  itemList,
                  setData,
                  setItemList,
                  team.connectChannelId
                )
              }
              role="button"
              tabIndex={0}
            >
              <div className="pointer-events-none flex h-full w-full select-none space-x-1 p-1">
                <div className="h-full rounded-full bg-orange-100 p-[2px]">
                  <img src={iconUrl} alt="" className="h-full rounded-full" />
                </div>
                <div className="flex h-full w-[124px] flex-col items-center justify-center  rounded-md bg-white px-2 drop-shadow-md">
                  <div className="w-full truncate">{name}</div>
                  <div className="truncate text-xs text-gray-500">
                    {`#${discriminator}`}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SelectMemberBox: FC<
  ListProps & { isHidden: boolean; Height: string }
> = ({ team, data, setData, isHidden, Height }) => {
  const [itemList, setItemList] = useState(team.selectMember);

  return (
    <div
      key={`#${team.guildId}#${team.connectChannelId}`}
      className={`${
        isHidden ? "hidden" : "block"
      } ${Height} scrollber-hidden w-full overflow-auto rounded-lg border-[3px] border-transparent bg-[#78b9d5] p-3`}
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
      <div className="grid h-auto min-h-[3rem] w-full min-w-[13rem] grid-cols-[repeat(auto-fit,12rem)] flex-col items-center justify-center gap-2 rounded-lg bg-[#fefcf0] p-4 ">
        {itemList.map((item) => {
          const { name, discriminator, iconUrl } = item;
          return (
            <div
              key={`${name}#${discriminator}`}
              className="scrollber-hidden flex h-16 w-48 cursor-pointer select-none items-center justify-center truncate rounded-lg bg-[#fd986d] text-center"
              onMouseDown={(event) =>
                mouseDown(
                  event,
                  data,
                  item,
                  itemList,
                  setData,
                  setItemList,
                  team.connectChannelId
                )
              }
              role="button"
              tabIndex={0}
            >
              <div className="pointer-events-none flex h-full w-full select-none space-x-1 p-1">
                <div className="h-full rounded-full bg-orange-100 p-[2px]">
                  <img src={iconUrl} alt="" className="h-full rounded-full" />
                </div>
                <div className="flex h-full w-[124px] flex-col items-center justify-center  rounded-md bg-white px-2 drop-shadow-md">
                  <p className="w-full truncate">{name}</p>
                  <p className="truncate text-xs text-gray-500">
                    {`#${discriminator}`}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
