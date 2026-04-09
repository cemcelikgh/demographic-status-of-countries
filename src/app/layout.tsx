import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";

export const metadata: Metadata = {
  title: "Demographic Status of Countries",
  icons: {
    icon: '/square-poll-vertical-solid.svg',
  },
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
}

export default RootLayout;
