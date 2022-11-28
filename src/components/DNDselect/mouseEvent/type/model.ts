import type { Dispatch, SetStateAction} from "react";

export type DataType = {
  element: HTMLInputElement | null;
  cloneElement: HTMLInputElement | null;
  enterElement: HTMLInputElement | null;
  shadowElement: HTMLInputElement | null;
  IsDragg: boolean;
  first: boolean;
  downInfo: SelectTeamType | null;
  elementCursorPointX: number;
  elementCursorPointY: number;
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