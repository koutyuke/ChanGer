import { FC } from "react";
import AreaFrame from "./module/AreaFrame";
import { TeamType } from "./mouseEvent/type/model";
import { MemberAreaProps } from "./type/model";

const MemberArea: FC<MemberAreaProps> = ({
  data,
  setData,
  isHidden,
  guildId,
  noSelectMembers,
  setIsElementDragg,
  isElementDragg
}) => {
  const noSelectMemberData: TeamType = {
    teamName: null,
    channelname: "selectBox",
    connectChannelId: "selectBox",
    guildId: guildId ?? "",
    selectMember:
      noSelectMembers?.map((serMem) => ({
        name: serMem.user.user_name,
        iconUrl:
          serMem.user.icon_url ??
          `${process.env.NEXT_PUBLIC_THIS_URL}/icon/none.png`,
        discriminator: serMem.user.user_discriminator,
        memberId: serMem.member_id,
      })) ?? [],
  };
  return (
    <AreaFrame
      outerKey={`#${guildId}#${noSelectMemberData.connectChannelId}`}
      team={noSelectMemberData}
      data={data}
      setData={setData}
      outerStyle={`${
        isHidden ? "hidden" : "block"
      } ${isElementDragg? "hover:border-orange-300":""} h-[calc(100%_-_4rem)] scrollber-hidden bg-[#78b9d5]`}
      innerStyle="bg-[#fefcf0]"
      setIsElementDragg={setIsElementDragg}
    />
  );
};

export default MemberArea;
