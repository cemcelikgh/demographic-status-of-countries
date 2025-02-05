'use client';

import { useSelector } from "react-redux";
import { selectTheme } from "@/lib/features/themeSlice";

function Html({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const theme = useSelector(selectTheme);

  return (
    <html lang="en" className={theme}>
      <body>
        {children}
      </body>
    </html>
  );
}

export default Html;
