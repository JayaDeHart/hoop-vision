import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { AuthProvider } from "./providers";
import TopNav from "./_components/topNav";
import BottomNav from "./_components/bottomNav";

export const metadata: Metadata = {
  title: "Hoop Vision",
  description: "Test your basketball prediction skills",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} min-h-screen bg-slate-50`}
    >
      <body className="">
        <TRPCReactProvider>
          <AuthProvider>
            <TopNav />
            <div className="bg-slate-50 px-36 py-24">{children}</div>
            <BottomNav />
          </AuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
