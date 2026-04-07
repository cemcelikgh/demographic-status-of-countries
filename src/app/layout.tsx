import type { Metadata } from "next";
import "./globals.css";
import App from "./StoreProvider";

export const metadata: Metadata = {
  title: "Demographic Status of Countries",
  icons: {
    icon: '/square-poll-vertical-solid.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <App>
      {children}
    </App>
  );
}
