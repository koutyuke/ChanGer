import axios from "axios";
import prisma, {
  Prisma,
  Guild,
  Channel,
  Team,
  Member,
  User,
  Category,
} from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type GetResponse = {
  guildId: string;
  guildName: string;
  iconUrl: string;
  categoris: {
    categoryName: string | null;
    categoryId: string | null;
    channels: {
      channelId: string;
      channelName: string;
      categoryId: string;
      joinMember: string[];
    }[];
  }[];
  channels: {
    channelId: string;
    channelName: string;
    categoryId: string | null;
    joinMember: string[];
  }[];
  canMoveMember: string[];
  notMoveMember: string[];
  allMember: {
    id: string;
    nickName: string;
  }[];
};

type GetUserProps = {
  iconUrl: string | null;
  userId: string;
  userName: string;
  userDiscriminator: string;
  userNick: string | null;
};

const GetGuildInfo = async (gid: string) =>
  prisma.guild.findUnique({
    where: {
      guild_id: gid,
    },
    include: {
      channels: {
        include: {
          join_members: {
            include: {
              user: true,
            },
          },
          team: {
            include: {
              team_member: {
                include: {
                  user: true,
                },
              },
              channel: true,
            },
          },
        },
      },
      teams: {
        include: {
          team_member: {
            include: {
              user: true,
            },
          },
          channel: true,
        },
      },
      members: {
        include: {
          user: true,
        },
      },
      categories: {
        include: {
          channels: {
            include: {
              join_members: {
                include: {
                  user: true,
                },
              },
              team: {
                include: {
                  team_member: {
                    include: {
                      user: true,
                    },
                  },
                  channel: true,
                },
              },
            },
          },
        },
      },
    },
  });

export type ResType = { data: GuildDataType | null };

const GuildInfo = async (
  req: NextApiRequest,
  res: NextApiResponse<ResType>
) => {
  const botUrl = process.env.DISCORD_INFO_URL;
  const gid = req.query.gid as string;
  const uid = req.query.uid as string;

  if (gid === undefined || uid === undefined) {
    res.status(412).json({ data: null });
    return;
  }
  if (botUrl === undefined) {
    res.status(500).json({ data: null });
    return;
  }
  if (req.method !== "GET") {
    res.status(405).json({ data: null });
    return;
  }
  const serchData = await GetGuildInfo(gid);
  if (serchData === null) {
    const guildData = await axios
      .get<GetResponse>(`${botUrl}/getGuild`, {
        method: "GET",
        params: {
          guildId: req.query.gid,
          userId: req.query.uid,
        },
      })
      .then((data) => {
        if (data.data === null) return null;
        return data.data;
      })
      .catch((error) => {
        res.status(error.response.status).json({ data: null });
        return null;
      });
    if (guildData === null || guildData.guildId === null) {
      return;
    }

    await Promise.all(
      guildData.allMember.map(async (mem) => {
        const memData = await prisma.user.findUnique({
          where: { user_id: mem.id },
        });

        if (memData === null) {
          const userData = await axios.get<GetUserProps>(`${botUrl}/getUser`, {
            method: "GET",
            params: {
              guildId: req.query.gid,
              userId: mem.id,
            },
          });

          if (userData.status !== 200) return;
          const createData: Prisma.UserUncheckedCreateInput = {
            user_id: userData.data.userId,
            user_name: userData.data.userName,
            user_discriminator: userData.data.userDiscriminator,
            icon_url: userData.data.iconUrl,
          };
          await prisma.user.create({
            data: createData,
          });
        }
      })
    );

    const createMember: Prisma.MemberUncheckedCreateWithoutGuildInput[] = [];

    guildData.notMoveMember.forEach((data) => {
      createMember.push({
        member_id: data,
        nick_name: guildData.allMember.filter((mem) => mem.id === data)[0]
          .nickName,
        channel_id: null,
        team_id: null,
      });
    });

    const createChannel: Prisma.ChannelUncheckedCreateWithoutGuildInput[] =
      guildData.channels.map(
        ({ channelId, channelName, joinMember, categoryId }) => {
          joinMember.forEach((data) => {
            createMember.push({
              member_id: data,
              nick_name: guildData.allMember.filter((mem) => mem.id === data)[0]
                .nickName,
              channel_id: channelId,
              team_id: null,
            });
          });
          return {
            channel_id: channelId,
            channel_name: channelName,
            category_id: categoryId ?? "None",
            HOME: false,
          };
        }
      );

    createChannel[0].HOME = true;

    const createCategory: Prisma.CategoryUncheckedCreateWithoutGuildInput[] =
      guildData.categoris.map(({ categoryId, categoryName }) => ({
        category_id: categoryId ?? "None",
        category_name: categoryName ?? "None",
      }));

    // const createTeam: Prisma.TeamUncheckedCreateWithoutGuildInput = {
    //   team_name: null,
    //   connect_channel_id: createChannel[1].channel_id,
    // };

    const createTeam: Prisma.TeamUncheckedCreateWithoutGuildInput[] = [
      // {
      //   team_name:null,
      //   connect_channel_id: "selectBox"
      // },
      ...createChannel.map<Prisma.TeamUncheckedCreateWithoutGuildInput>(
        (channel) => ({
          team_name: null,
          connect_channel_id: channel.channel_id,
        })
      ),
    ];

    const createGuild: Prisma.GuildCreateInput = {
      guild_id: guildData.guildId,
      guild_name: guildData.guildName,
      icon_url: guildData.iconUrl,
      categories: {
        create: createCategory,
      },
      channels: {
        create: createChannel,
      },
      teams: {
        create: createTeam,
      },
      members: {
        create: createMember,
      },
    };

    await prisma.guild.create({ data: createGuild });

    const reSerchData: GuildDataType = await GetGuildInfo(gid);

    res.status(200).json({ data: reSerchData });
  } else {
    res.status(200).json({ data: serchData });
  }
};

export default GuildInfo;

export type GuildDataType =
  | (Guild & {
      channels: (Channel & {
        join_members: (Member & {
          user: User;
        })[];
        team:
          | (Team & {
              team_member: (Member & {
                user: User;
              })[];
              channel: Channel | null;
            })
          | null;
      })[];
      teams: (Team & {
        team_member: (Member & {
          user: User;
        })[];
        channel: Channel | null;
      })[];
      members: (Member & {
        user: User;
      })[];
      categories: (Category & {
        channels: (Channel & {
          join_members: (Member & {
            user: User;
          })[];
          team:
            | (Team & {
                team_member: (Member & {
                  user: User;
                })[];
                channel: Channel | null;
              })
            | null;
        })[];
      })[];
    })
  | null;
