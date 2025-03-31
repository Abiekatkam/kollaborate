import { CLIENT_SIDE_URL } from "@/components/constants/urls";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GetCurrentUserProfile } from "@/lib/authorisation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { HiCubeTransparent } from "react-icons/hi";

interface AuthenticationLayoutProps {
  children: ReactNode;
}

const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = async ({
  children,
}) => {
  const user = await GetCurrentUserProfile();
  if (user) {
    redirect(CLIENT_SIDE_URL.HOME.INDEX);
  }

  return (
    <React.Fragment>
      <main className="relative flex sm:h-[100vh] h-full sm:min-h-screen selection:bg-green-100 selection:text-green-600">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

        <div className="sm:m-auto flex w-fit min-[300px]:flex-col sm:flex-row items-center justify-center py-5 sm:px-8 sm:pt-6 rounded-md border-2 dark:border-neutral-700 relative z-20 bg-white dark:bg-black">
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-0 w-full max-w-[330px] sm:max-w-[360px]">
            <Link
              href="/"
              className="w-fit flex flex-col items-center justify-center text-4xl group"
            >
              <span className="p-3 flex items-center justify-center group-hover:rotate-90 text-neutral-50 bg-neutral-900 dark:text-neutral-700 dark:bg-neutral-50 rounded-full  transition-all ease-in duration-200">
              <HiCubeTransparent />
            </span>
              <span className="mt-1 font-black text-4xl text-neutral-900 dark:text-neutral-300">
                Kollaborate
              </span>
            </Link>
            <TypewriterEffect
              words={[
                {
                  text: "Connect.",
                  className: "text-neutral-700 dark:text-neutral-400",
                },
                {
                  text: "Communicate.",
                  className: "text-neutral-700 dark:text-neutral-400",
                },
                {
                  text: "Collaborate.",
                  className: "text-neutral-700 dark:text-neutral-400",
                },
              ]}
              className="text-md mb-3"
              cursorClassName="bg-green-500"
            />
            {children}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default AuthenticationLayout;
