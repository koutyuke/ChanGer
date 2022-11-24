import prisma, { User } from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type RespnseData = {
  data: User | null;
};

const ChannelInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(500);
  } else {
    const serchData = await prisma.user.findUnique({
      where: {},
    });

    res.status(200).json({
      hoge: "hogehoge",
      serch: serchData,
    });
  }
};

export default ChannelInfo;
