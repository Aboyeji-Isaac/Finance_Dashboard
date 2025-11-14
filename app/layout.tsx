import "./styles/globals.css";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import ClientLayout from "./ClientLayout";

const inter = Inter({ variable: "--font-geist-sans", subsets: ["latin"] });
const robotoMono = Roboto_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "Small Business Financial Management Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
