import axios from "axios";
import Body from "components/Body";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SessionValue } from "pages/api/auth/[...nextauth]";
import { GuildDataType, ResType } from "pages/api/info/guild";
import { FC, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

type IndexProps = {
  status: number;
  statusText: string;
  data: GuildDataType | null;
};

type MessageModel = {
  message: string;
  name: string;
  id: string;
};
type SettingData = {
  type: "home" | "hoge";
  guildId: string;
  categoryId: string;
  channelId: string;
  beforeId: string | null;
  afterId: string | null;
};

const Index: FC<IndexProps> = ({ data, status, statusText }) => {
  const rooter = useRouter();
  if (status !== 200 || data === undefined || data === null) {
    rooter.push({
      pathname: "http://localhost:3000/404",
    });
  }
  const socket = useMemo(() => io(), []);
  const Id = data?.guild_id;
  const [message, setMessage] = useState<MessageModel[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`socket connect:${socket.id}`);
      socket.emit("join", Id);
    });
    socket.on("setting", () => {
      console.log("newData");
    });
    socket.on("change-member", () => {
      console.log("change-member");
    });
  }, [Id, socket]);

  return (
    <Body GuildData={data} socket={socket} />
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<IndexProps> = async (
  context
) => {
  const { gid } = context.query;
  const session = (await getSession(context)) as SessionValue;

  const host = context.req.headers.host || "localhost:3000";
  const protocol = /^localhost/.test(host) ? "http" : "https";
  const url = `${protocol}://${host}/api/info/guild`;

  const guildData = await axios
    .get<ResType>(url, {
      method: "GET",
      params: {
        gid,
        uid: session.profile.id,
      },
    })
    .then((value) => ({
      stauts: value.status,
      statusText: value.statusText,
      data: value.data.data,
    }))
    .catch((error) => ({
      stauts: error.response.status as number,
      statusText: error.response.statusText as string,
      data: null,
    }));
  return {
    props: {
      status: guildData.stauts,
      statusText: guildData.statusText,
      data: guildData.data,
    },
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const SocketIndex = () =>{
//
//   "12345";
//
// socket.on("message",(msg:MessageModel)=>{
//   setMessage((data)=>[
//     ...data,
//     {
//       message:msg.message,
//       id:msg.id,
//       name:msg.name
//     }
//   ])
// })

//   const buttonClick = () =>{
//     console.log("send")
//     socket.emit("message",{
//       message:"test",
//       userNmae:"hoge",
//       guildId:"12345"
//     });
//   }

//   return(
//     <div>
//       <div>hoge</div>
//       <div>
//         <div>
//           <button type='button' onClick={buttonClick}>send</button>
//         </div>
//       </div>
//       <div>
//         {message.map(value=>{
//           console.log(value)
//           return(
//           <div key="k">{value.message}</div>
//         )})}
//       </div>
//     </div>
//   )
// }
