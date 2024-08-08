import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import UserProvider from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Classificação inteligente",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const userLogon = await getUserLogon();
  // user.userLogon = userLogon.userlogon;
  // user.displayName = userLogon.displayName;
  // user.usuario = userLogon.usuario;
  // Object.freeze(user);
  // const UserContext = createContext(String);

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <UserProvider>
          <main className="min-h-screen bg-gray-100">
            <Nav />
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
