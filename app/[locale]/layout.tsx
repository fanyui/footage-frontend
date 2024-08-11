import { Inter } from "next/font/google";
import { getAuthSession } from "@/src/lib/auth";
import "../../src/styles/globals.css";
import { Providers } from "@/src/providers";

import { hatton, atten_new } from "@/src/utils/fonts";
import { cn } from "@/src/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', });

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen">
        <Providers session={session} locale={locale}>
          {children}

        </Providers>
      </body>
    </html>
  );
}
