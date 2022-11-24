import { useSession } from "next-auth/react";
import Welcome from "components/Welcome";

const Index = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="flex h-full w-full items-center justify-center text-center text-3xl">
        <span>Loading...</span>
      </div>
    );
  }
  if (session) {
    return (
      <div className="h-full w-full p-12">
        <Welcome IsSignIn />
      </div>
    );
  }
  return (
    <div className="h-full w-full p-12">
      <Welcome IsSignIn={false} />
    </div>
  );
};

export default Index;
