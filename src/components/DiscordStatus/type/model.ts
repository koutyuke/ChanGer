import { Category, Channel, Member, Team, User } from "lib/prisma";

type Categories = (
  | (Category & {
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
    })
  | undefined
)[];

export type StatusProps = {
  categories: Categories;
};