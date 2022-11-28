import prisma from "lib/prisma";

export const ChangeTeamMember = async (
  guildId: string,
  connectId: string,
  memberId: string
) => {
  const setData = connectId === "selectBox" ? { set: null } : connectId;
  await prisma.member.update({
    where: {
      guild_id_member_id: {
        guild_id: guildId,
        member_id: memberId,
      },
    },
    data: {
      team_id: setData,
    },
  });
};

export const hoge = () => {};
