import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const Home = async (req: NextApiRequest, res: NextApiResponse) => {
  const gid = req.body.guildId as string;
  const cid = req.body.categoryId as string;
  const beforeHome = req.body.beforeHome as string;
  const afterHome = req.body.afterHome as string;

  if (
    gid === undefined ||
    cid === undefined ||
    beforeHome === undefined ||
    afterHome === undefined
  ) {
    res.status(412).json({ data: null });
    return;
  }

  await prisma.channel.update({
    where: {
      channel_id: beforeHome,
    },
    data: {
      HOME: false,
    },
  });

  await prisma.channel.update({
    where: {
      channel_id: afterHome,
    },
    data: {
      HOME: true,
    },
  });

  res.status(200).end();
};

export default Home;
