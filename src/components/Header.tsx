import { signIn, signOut, useSession } from "next-auth/react";
import { SessionValue } from "pages/api/auth/[...nextauth]";
import { useState } from "react";

const Session = () => {
  const { data: session, status } = useSession();
  const sessionValue = session as SessionValue;
  const [isOpen, setOpen] = useState(false);

  if (status === "loading") {
    return (
      <p className="truncate rounded-lg bg-red-400 py-2 px-2 text-lg">
        loading
      </p>
    );
  }
  if (session) {
    return (
      <div
        className="relative h-full w-full rounded-lg border-2 border-transparent bg-red-300 hover:border-blue-400"
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        <button
          className="flex h-full w-auto items-center justify-start space-x-2 p-1"
          onClick={() => {
            setOpen(!isOpen);
          }}
          type="button"
        >
          <div className="h-full rounded-full bg-orange-100 p-[2px]">
            <img
              src={sessionValue.profile.image_url}
              alt=""
              className="h-full rounded-full object-contain"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="truncate text-lg">{sessionValue.user.name}</p>
            <p className="truncate text-xs text-gray-500">
              #{sessionValue.profile.discriminator}
            </p>
          </div>
        </button>

        <button
          type="button"
          className={`${
            isOpen ? "block" : "hidden"
          } absolute -bottom-10 left-0 -z-10 flex h-12 w-full items-center justify-center rounded-lg border-2  border-transparent bg-red-400 pt-2 hover:border-blue-400`}
          onClick={() => {
            signOut({ callbackUrl: "http://localhost:3000" });
          }}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="h-full w-40 rounded-lg border-2 border-transparent bg-red-400 text-center text-2xl hover:border-blue-400 "
      onClick={() => signIn("discord")}
    >
      Sign In
    </button>
  );
};

const Header = () => (
  <header className="flex h-full w-full select-none items-center justify-between bg-white p-2 drop-shadow-lg">
    <div className="flex h-full items-end space-x-2">
      <a
        href="http://localhost:3000/"
        className="w-auth flex h-full  items-center justify-center space-x-1 rounded-lg border-2 border-transparent bg-[#A8DADC] py-1 px-2 drop-shadow-md hover:border-orange-400"
      >
        <img
          src="http://localhost:3000/icon/icon.PNG"
          alt=""
          className="h-full "
        />
        <div className="flex text-4xl">
          <span className="text-white">Chan</span>
          <span className="text-[#1A535C]">Ger</span>
        </div>
      </a>
      <a
        href="http://localhost:3000/howtouse"
        className="flex h-2/3 items-center justify-center rounded-lg border-2 border-transparent bg-[#95D5B2] p-2 text-xl text-white drop-shadow-md  hover:border-orange-400"
      >
        How To Use
      </a>
      <a
        href="http://localhost:3000/information"
        className="flex h-2/3 items-center justify-center rounded-lg border-2 border-transparent bg-[#95D5B2] p-2 text-xl text-white drop-shadow-md  hover:border-orange-400"
      >
        Information
      </a>
      <a
        href="http://localhost:3000/porivacy"
        className="flex h-2/3 items-center justify-center rounded-lg border-2 border-transparent bg-[#95D5B2] p-2 text-xl text-white drop-shadow-md  hover:border-orange-400"
      >
        Porivacy
      </a>
    </div>
    <div className="flex h-full max-w-xs items-center justify-center rounded-lg font-ubuntu drop-shadow-md">
      <Session />
    </div>
  </header>
);

export default Header;
