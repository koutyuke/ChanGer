import { GuildDataType } from "pages/api/info/guild";
import { FC, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import DiscordStatus from "components/DiscordStatus";
import { Change, Home, Reset, Setting } from "./Button";
import MemberArea from "./DNDselect/MemberArea";
import TeamArea from "./DNDselect/TeamArea";
import { DataType} from "./DNDselect/mouseEvent/type/model";
import mouseMove from "./DNDselect/mouseEvent/MouseMove";
import mouseUp from "./DNDselect/mouseEvent/MouseUp";

type BodyProps = {
  GuildData: GuildDataType;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};

const Body: FC<BodyProps> = ({ GuildData, socket }) => {
  const [data, setData] = useState<DataType>({
    element: null,
    shadowElement: null,
    cloneElement: null,
    enterElement: null,
    IsDragg: false,
    first: false,
    downInfo: null,
    enterInfo: null,
    elementCursorPointX: 0,
    elementCursorPointY: 0,
    guildId: GuildData?.guild_id as string,
  });

  const [isElementDragg, setIsElementDragg] = useState(false);

  useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      mouseMove(event, data, setData);
    });

    window.addEventListener("mouseup", () => {
      mouseUp(data, setData, socket,setIsElementDragg);
    });
  }, [data, socket]);

  const soteCategories = [
    GuildData?.categories.find((category) => category.category_name === "None"),
  ];
  GuildData?.categories
    ?.filter((category) => category.channels.length)
    .forEach((category) => soteCategories.push(category));

  const [members, setMembers] = useState(GuildData?.members);
  const [teams, setTeams] = useState(GuildData?.teams);
  const [channels, setChannels] = useState(GuildData?.channels);
  const [categories, setCategoies] = useState(soteCategories);
  const [IsSetting, setSetting] = useState(false);
  const [IsMemberAll, setMemberAll] = useState(GuildData?.all_member);
  const [IsTeamAll, setTeamAll] = useState(GuildData?.all_channel);
  const [HOME, setHOME] = useState(channels?.find((channel) => channel.HOME));

  const noSelectMember = GuildData?.members.filter(
    (serMem) => serMem.team_id === null
  );

  return (
    <div className="flex h-full w-full select-none space-x-3 p-6">
      <div className="flex w-full space-x-5">
        <div className="h-full basis-1/2  rounded-lg bg-[#fefcf0] p-4">
          <TeamArea
            data={data}
            setData={setData}
            isHidden={IsSetting}
            homeChannelName={HOME?.channel_name}
            teams={teams}
            setIsElementDragg={setIsElementDragg}
            isElementDragg={isElementDragg}
          />

          <div
            className={`${
              IsSetting ? "block" : "hidden"
            } h-full w-full rounded-lg bg-gray-400 p-2`}
          >
            <div className="h-full w-full rounded-lg bg-gray-100">
              <div className="scrollber-hidden flex h-full w-full flex-col space-y-4 overflow-auto rounded-lg bg-gray-100 p-2">
                <div className="w-full flex-col space-y-4">
                  <div className="border-b-2 border-black">
                    <div className="flex space-x-2">
                      <p>HOME</p>
                      <p>Setting</p>
                    </div>
                  </div>
                  <div className="flex w-full justify-center">
                    <select
                      name="homechannel"
                      className="bg- flex h-10 w-32 justify-center rounded-lg border-2 border-gray-400 bg-gray-200"
                      value={
                        channels?.find((channel) => channel.HOME)?.channel_id
                      }
                      onChange={async (HOMEdata) => {
                        socket.emit("setting", {
                          type: "home",
                          guildId: GuildData?.guild_id,
                          categoryId: "",
                          channelId: "",
                          beforeId: channels?.find((channel) => channel.HOME)
                            ?.channel_id,
                          afterId: HOMEdata.target.value,
                        });
                      }}
                    >
                      {channels?.map((channel) => (
                        <option
                          value={channel.channel_id}
                          key={`selectOptiion-${channel.channel_id}`}
                          className="rounded-lg bg-gray-200"
                        >
                          {channel.channel_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="w-full flex-col space-y-4">
                  <div className="flex border-b-2 border-black">
                    <div className="flex space-x-2">
                      <p>Team&Channel</p>
                      <p>Setting</p>
                    </div>

                    <div className="flex w-full items-center justify-end space-x-2">
                      <button
                        className={`${
                          IsTeamAll ? "bg-green-300" : "bg-white"
                        } flex h-4 w-8 items-center rounded-full border-2 border-gray-500 px-0.5`}
                        onClick={() => {
                          setTeamAll(!IsTeamAll);
                        }}
                        type="button"
                      >
                        <div
                          className={`${
                            IsTeamAll ? "translate-x-4" : ""
                          } h-2 w-2 rounded-full border-2 border-gray-500 bg-white duration-300 ease-in-out`}
                        />
                      </button>
                      <p>ALL CHANNEL</p>
                    </div>
                  </div>

                  <div className="w-full flex-col space-y-2 px-2">
                    {categories
                      ?.filter(
                        (category) =>
                          category?.channels.length &&
                          category?.category_name !== "None"
                      )
                      .map((category) => (
                        <div key={`setting-${category?.category_id}`}>
                          <div className="border-b-2 border-gray-300">
                            {category?.category_name}
                          </div>
                          <div className="grid w-full grid-cols-[repeat(auto-fit,14rem)] grid-rows-[repeat(auto-fit,2rem)] justify-center  gap-2 px-2 pt-4">
                            {category?.channels.map((channel) => (
                              <div
                                key={`setting-${channel.channel_id}`}
                                className="h-8 w-full truncate px-2"
                              >
                                <input
                                  type="checkbox"
                                  className="mr-1"
                                  defaultChecked={channel.use}
                                />
                                {channel.channel_name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full basis-1/2 flex-col items-center space-y-4 rounded-lg bg-[#fefcf0] p-4 ">
          <div className="scrollber-hidden flex h-12 min-w-full justify-start space-x-2 overflow-auto">
            <Setting setSetting={setSetting} IsSetting={IsSetting} />
            <Home IsSetting={IsSetting} />
            <Change IsSetting={IsSetting} />
            <Reset IsSetting={IsSetting} />
          </div>

          <MemberArea
            noSelectMembers={noSelectMember}
            data={data}
            setData={setData}
            isHidden={IsSetting}
            guildId={GuildData?.guild_id ?? ""}
            setIsElementDragg={setIsElementDragg}
            isElementDragg={isElementDragg}
          />

          <div
            className={`${
              IsSetting ? "block" : "hidden"
            } h-[calc(100%_-_4rem)] w-full rounded-lg bg-gray-400 p-2`}
          >
            <div className="scrollber-hidden flex h-full w-full flex-col space-y-4 overflow-auto rounded-lg bg-gray-100 p-2">
              <div className="flex border-b-2 border-black">
                <div className="flex space-x-2">
                  <p>Member</p>
                  <p>Setting</p>
                </div>
                <div className="flex w-full items-center justify-end space-x-2">
                  <button
                    className={`${
                      IsMemberAll ? "bg-green-300" : "bg-white"
                    } flex h-4 w-8 items-center rounded-full border-2 border-gray-500 px-0.5`}
                    onClick={() => {
                      setMemberAll(!IsMemberAll);
                    }}
                    type="button"
                  >
                    <div
                      className={`${
                        IsMemberAll ? "translate-x-4" : ""
                      } h-2 w-2 rounded-full border-2 border-gray-500 bg-white duration-300 ease-in-out`}
                    />
                  </button>
                  <p>ALL MEMBER</p>
                </div>
              </div>

              <div className="grid w-full grid-cols-[repeat(auto-fit,14rem)] grid-rows-[repeat(auto-fit,2rem)]  justify-center gap-2 px-2">
                {members?.map((member) => (
                  <div
                    className="w-full truncate"
                    key={`setting-${member.user.user_id}`}
                  >
                    <input
                      type="checkbox"
                      className="mr-1"
                      defaultChecked={member.use}
                    />
                    {member.nick_name ?? member.user.user_name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scrollber-hidden w-48 overflow-auto rounded-lg bg-[#fefcf0] p-4">
        <DiscordStatus categories={categories} />
      </div>
    </div>
  );
};

export default Body;
