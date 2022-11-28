import { Channel, Member, Team, User } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { DataType } from "../mouseEvent/type/model";

type AreaBaseProps = {
  data: DataType;
  setData: Dispatch<SetStateAction<DataType>>;
  isHidden: boolean;
  setIsElementDragg: Dispatch<SetStateAction<boolean>>;
  isElementDragg: boolean
};

type TeamsType = (Team & {
  team_member: (Member & {
    user: User;
  })[];
  channel: Channel | null;
})[];

export type MemberAreaProps = AreaBaseProps & {
  guildId: string;
  noSelectMembers?:
    | (Member & {
        user: User;
      })[]
    | undefined;
};

export type TeamAreaProps = AreaBaseProps & {
  homeChannelName?: string;
  teams?: TeamsType;
};
