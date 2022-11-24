import { useSession } from "next-auth/react";
import { FC } from "react";
import { useRouter } from "next/router";
import { SessionValue } from "pages/api/auth/[...nextauth]";
import Layout from "components/Layout";

type GuildImageProps = {
  id: string;
  icon: string | null;
};

const GuildImage: FC<GuildImageProps> = ({ id, icon }) => {
  if (icon) {
    return (
      <img
        src={`https://cdn.discordapp.com/icons/${id}/${icon}.webp`}
        className="h-36 w-36 rounded-full bg-white"
        alt=""
      />
    );
  }
  return (
    <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gray-400">
      <span>No Image</span>
    </div>
  );
};

const Index = () => {
  const { data: session, status } = useSession();
  const sessionValue = session as SessionValue;
  const router = useRouter();

  if (status === "loading") {
    return (
      <Layout>
        <div className="flex h-full w-full items-center justify-center text-center text-3xl">
          <span>Loading...</span>
        </div>
      </Layout>
    );
  }

  if (session) {
    return (
      <div className="flex h-full w-full justify-center p-8 ">
        <div className="flex h-full w-2/3 flex-col rounded-xl bg-red-400 p-3">
          <div className="flex h-[10%] w-full items-center justify-center rounded-lg bg-[#FFFCF2]">
            <span className="text-2xl">Chose Guild</span>
          </div>
          <div className="pw-4 mt-2 h-[calc(90%_-_0.5rem)] rounded-lg bg-[#FFFCF2] ">
            <div className="scrollber-hidden grid h-full w-full grid-cols-[repeat(auto-fit,10rem)]  grid-rows-[repeat(auto-fit,12rem)] justify-center gap-4 overflow-auto py-4">
              {sessionValue.guilds?.map(({ id, name, icon }) => (
                <button
                  key={`${id}`}
                  type="button"
                  className="h-48 w-40 rounded-lg border-orange-400 bg-[#CCD5AE] p-2 hover:scale-110 hover:border-2"
                  onClick={() =>
                    router.push({
                      pathname: `/user/${sessionValue?.user?.name}`,
                      query: { gid: id },
                    })
                  }
                >
                  <GuildImage id={id} icon={icon} />
                  <div className="mt-1 h-6 w-full truncate">{name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  router.push({
    pathname: "http://localhost:3000",
  });

  return (
    <Layout>
      <div className="h-full w-full p-12">redirecting...</div>
    </Layout>
  );
};

export default Index;
