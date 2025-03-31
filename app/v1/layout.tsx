import { CLIENT_SIDE_URL } from "@/components/constants/urls";
import { Toaster } from "@/components/ui/sonner";
import { GetCurrentUserProfile } from "@/lib/authorisation";
import { redirect } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "Kollaborate | Abhishek Katkam",
  description: "Connect. Communicate. Collaborate.",
};

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await GetCurrentUserProfile();
  if (!user) {
    redirect(CLIENT_SIDE_URL.AUTH.LOGIN);
  }

  return (
    <main className="flex h-full flex-col antialiased selection:bg-green-100 selection:text-green-600">
      <NextTopLoader color="#00a63e" height={2} showSpinner={false} />

      {/* <SocketProvider userId={user?.id}> */}
      {/* <ModalProvider /> */}
      {/* <QueryProvider> */}
      <div className="h-full w-full dark:bg-[#09090a]">
        <div className="md:flex min-[300px]:hidden h-full w-[64px] z-30 flex-col fixed inset-y-0">
          {/* <Sidebar /> */}
        </div>
        <div className="md:pl-[64px] h-full">{children}</div>
      </div>
      {/* </QueryProvider> */}
      {/* </SocketProvider> */}

      <Toaster
        closeButton
        position="top-right"
        theme="system"
        visibleToasts={3}
        richColors
      />
    </main>
  );
}
