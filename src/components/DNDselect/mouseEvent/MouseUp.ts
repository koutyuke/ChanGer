import type { Dispatch, SetStateAction } from "react";
import type { Socket } from "socket.io-client";
import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import type { DataType } from "./type/model";

const mouseUp = (
  data: DataType,
  setData: Dispatch<SetStateAction<DataType>>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  setIsElementDragg: Dispatch<SetStateAction<boolean>>
) => {
  const newData = data;

  newData.shadowElement?.remove();
  newData.cloneElement?.remove();
  newData.element?.classList.remove("hidden");
  newData.IsDragg = false;
  setIsElementDragg(false)
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

export default mouseUp;
