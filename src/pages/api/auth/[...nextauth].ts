import nextAuth, { User } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import axios from "axios";

export type SessionValue = {
  user: User;
  profile: Profile;
  guilds: AxiosProps;
  expires: string;
  accessToken: string;
  refreshToken: string;
};

type Profile = {
  accent_color: number;
  avatar: string;
  banner_color: string;
  discriminator: string;
  email: string;
  id: string;
  image_url: string;
  username: string;
};

type AxiosProps = {
  id: string;
  name: string;
  icon: string;
  owber: boolean;
  parmissions: string;
  features: string[];
}[];

export default nextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID ?? "",
      clientSecret: process.env.DISCORD_SECRET ?? "",
      authorization: process.env.DISCORD_AUTHORIZATION ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account?.access_token) {
        return {
          accessToken: account.access_token,
          profile,
          refreshToken: account.refresh_token,
          user,
          guilds: await axios
            .get<AxiosProps>("https://discordapp.com/api/users/@me/guilds", {
              headers: { Authorization: `Bearer ${account.access_token}` },
            })
            .then((data) => data.data)
            .catch(() => undefined),
        };
      }
      return token;
    },
    session({ session, token }) {
      const value = token as SessionValue;
      const setSession = session;
      setSession.user = value.user;
      setSession.profile = value.profile;
      setSession.guilds = value.guilds;
      setSession.accessToken = value.accessToken;
      setSession.refreshToken = value.refreshToken;
      return setSession;
    },
  },
});
