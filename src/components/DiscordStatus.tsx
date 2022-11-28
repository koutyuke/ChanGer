import { Category, Channel, Member, Team, User } from "lib/prisma";
import { FC } from "react";

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

type StatusProps = {
  categories: Categories;
};

const Status: FC<StatusProps> = ({ categories }) => {
  const usingChannel = categories.filter(
    (categoriy) =>
      categoriy?.channels.filter((channel) => channel.join_members.length)
        .length
  );

  if (!usingChannel.length) {
    return <p>no join member</p>;
  }
  return (
    <ul role="menu">
      {usingChannel.map((category) => (
        <li
          className="w-full truncate"
          key={`nowCategory-${category?.category_id}`}
        >
          <p className="border-b-2 border-red-400">
            <small>{category?.category_name}</small>
          </p>
          <ul role="menu">
            {category?.channels
              .filter((channel) => channel.join_members.length)
              .map((channel) => (
                <li key={`nowChannel-${channel.channel_id}`}>
                  <p className="w-full truncate border-b-2 border-gray-400 text-sm">
                    {channel.channel_name}
                  </p>
                  <ul className="flex w-full flex-col justify-start truncate pl-2">
                    {channel.join_members.map((member) => (
                      <li key={`nowMember-${member.user.user_id}`}>
                        {member.nick_name ?? member.user.user_name}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Status;
