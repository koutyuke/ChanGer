import { FC } from "react";
import { MdHome } from "react-icons/md";
import AreaFrame from "./module/AreaFrame";
import { TeamType } from "./mouseEvent/type/model";
import type { TeamAreaProps } from "./type/model";

const TeamArea: FC<TeamAreaProps> = ({
  data,
  setData,
  isHidden,
  homeChannelName,
  teams,
  setIsElementDragg,
  isElementDragg
}) => (
  <div
    className={`${
      isHidden ? "hidden" : "block"
    } scrollber-hidden flex h-full w-full flex-col space-y-2 overflow-auto rounded-lg border-[3px] border-transparent bg-[#78b9d5] p-4`}
  >
    <div className="h-18 flex w-full items-center justify-center space-x-2 rounded-lg bg-gray-100 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#79d5a3]">
        <MdHome size={48} color="white" />
      </div>
      <div className="flex h-10 w-[calc(100%_-_3rem)] items-center justify-center overflow-auto rounded-lg bg-[#79d5a3]">
        <p className="text-center text-2xl text-white">{homeChannelName}</p>
      </div>
    </div>

    {teams?.map((team) => {
      const propsTeam: TeamType = {
        teamName: team.team_name,
        selectMember: team.team_member.map((mem) => ({
          name: mem.nick_name ?? mem.user.user_name,
          iconUrl:
            mem.user.icon_url ??
            `${process.env.NEXT_PUBLIC_THIS_URL}/icon/none.png`,
          discriminator: mem.user.user_discriminator,
          memberId: mem.member_id,
        })),
        guildId: team.guild_id,
        connectChannelId: team.connect_channel_id,
        channelname: team.channel?.channel_name ?? "",
      };

      return (
        <AreaFrame
          team={propsTeam}
          data={data}
          setData={setData}
          outerStyle={`${isElementDragg? "hover:border-orange-300":""} bg-gray-100`}
          innerStyle="bg-gray-300"
          key={`#${propsTeam.guildId}#${propsTeam.connectChannelId}`}
          outerKey={`#${propsTeam.guildId}#${propsTeam.connectChannelId}`}
          setIsElementDragg={setIsElementDragg}
        >
          <div className="flex h-10 w-full select-none items-center justify-center rounded-lg bg-[#79d5a3] text-center text-2xl text-white">
            <div>{propsTeam.teamName ?? propsTeam.channelname}</div>
          </div>
        </AreaFrame>
      );
    })}
  </div>
);

export default TeamArea;
