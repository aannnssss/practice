import { Jura } from "next/font/google";
import "./globals.css";
import Logo from './components/Logo';

const jura = Jura({ subsets: ["latin"] });

export const metadata = {
  title: "SocialPlatform",
  description: "Социальная платформа 8 института"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={jura.className}>
        <Logo/>
        {children}
      </body>
    </html>
  );
}