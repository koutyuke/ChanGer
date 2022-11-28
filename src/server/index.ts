import { Server, createServer } from "http";
import next, { NextApiHandler, NextApiRequest } from "next";
import express, { Express, Request, Response } from "express";
import { Server as SockerioServer, Socket } from "socket.io";
import axios from "axios";
import { ChangeTeamMember } from "repositories/Setting";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle: NextApiHandler = app.getRequestHandler();

export type Data = {
  message: string;
  userName: string;
  guildId: string;
};

type SettingData = {
  type: "home" | "hoge";
  guildId: string;
  categoryId: string;
  channelId: string;
  beforeId: string | null;
  afterId: string | null;
};

type ChangeMember = {
  memberId: string;
  connectId: string;
  guildId: string;
};

app
  .prepare()
  .then(() => {
    const expressApp: Express = express();
    const server: Server = createServer(expressApp);
    const io: SockerioServer = new SockerioServer();

    io.attach(server);

    expressApp.get("/socket", (_: Request, res: Response) => {
      res.send("helloworld");
    });

    io.on("connection", (socket: Socket) => {
      socket.on("join", (guildId: string) => {
        socket.join(guildId);
        console.log(`join room!: ${guildId}`);
      });
      socket.on("leave", (guildId: string) => {
        socket.leave(guildId);
        console.log("leave room");
      });
      socket.on("message", (data: Data) => {
        io.to(data.guildId).emit("message", {
          message: "data.message",
          username: data.userName,
          guildId: data.guildId,
        });
      });
      socket.on("setting", async (data: SettingData) => {
        if (data.type === "home") {
          await axios
            .post("http://localhost:3000/api/setting/HOME", {
              guildId: data.guildId,
              categoryId: data.categoryId,
              beforeHome: data.beforeId,
              afterHome: data.afterId,
            })
            .then(() => {
              io.to(data.guildId).emit("setting", {
                guildId: data.guildId,
                categoryId: data.categoryId,
                channelId: data.channelId,
                beforeHome: data.beforeId,
                afterHome: data.afterId,
              });
            })
            .catch(() => {
              io.to(socket.id).emit("reload");
            });
        }
      });
      socket.on("change-member", async (data: ChangeMember) => {
        console.log(data);
        await ChangeTeamMember(data.guildId, data.connectId, data.memberId)
          .then(() => {
            io.to(data.guildId).emit("change-member", {
              guildId: data.guildId,
              connectId: data.connectId,
              memberId: data.memberId,
            });
          })
          .catch(() => {
            io.to(socket.id).emit("reload");
          });
      });
    });

    expressApp.post("/change-member", (req, res) => {
      console.log("sample");
      console.log(req);
      io.to("788349336287182879").emit("change-member");
      res.status(200).end();
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expressApp.all("*", (req: NextApiRequest, res: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      handle(req, res);
    });
    server.listen(port, () => {
      console.log(`Ready on http://localhost:${port}`);
    });
  })
  .catch((e) => console.error(e));
