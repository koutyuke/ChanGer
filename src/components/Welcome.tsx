import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";

type WelcomeProp = { IsSignIn: boolean };

const Welcome: FC<WelcomeProp> = ({ IsSignIn }) => {
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col items-center space-y-6">
      <p className="text-6xl">WELCOME TO CHANGER 🎉🎉</p>
      <p className="text-4xl">
        {IsSignIn
          ? "Let's Choise Using GUILD And Play ChanGer!!"
          : "Please Sign In With Discord!!"}
      </p>
      <button
        type="button"
        className="h-32 w-64 rounded-lg border-2 border-transparent bg-red-400 p-2 text-4xl hover:border-white "
        onClick={() => {
          if (IsSignIn) {
            router.push({ pathname: "http://localhost:3000/choice" });
          } else {
            signIn("discord", { callbackUrl: "http://localhost:3000/choice" });
          }
        }}
      >
        {IsSignIn ? "Choise Guild" : "Sign In"}
      </button>
      <div className="flex h-full w-full flex-col items-center space-y-4 p-3">
        <p className="text-4xl">Pages</p>
        <div className="grid h-full w-full grid-cols-3 gap-4">
          <p className="h-full w-full rounded-xl bg-gray-200 p-2">
            How To Use
          </p>
          <p className="h-full w-full rounded-xl bg-gray-200 p-2">
            Information
          </p>
          <p className="h-full w-full rounded-xl bg-gray-200 p-2">
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
