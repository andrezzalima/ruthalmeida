import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ruth Almeida",
  description: "Mesa posta, etiqueta na América e reconexão familiar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
