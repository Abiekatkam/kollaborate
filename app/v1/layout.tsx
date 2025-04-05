import { CLIENT_SIDE_URL } from "@/components/constants/urls";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
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
    <main className="flex h-full flex-col antialiased selection:bg-fuchsia-100 selection:text-fuchsia-600 dark:selection:bg-fuchsia-600 dark:selection:text-fuchsia-100">
      <NextTopLoader color="#c800de" height={2} showSpinner={false} />

      <SocketProvider>
        <ModalProvider />
        <QueryProvider>
          <div className="h-full w-full dark:bg-[#09090a]">
            <div className="md:flex min-[300px]:hidden h-full w-[64px] z-30 flex-col fixed inset-y-0">
              <NavigationSidebar />
            </div>
            <div className="md:pl-[64px] h-full">{children}</div>
          </div>
        </QueryProvider>
      </SocketProvider>

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
