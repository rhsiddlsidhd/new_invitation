import Header from "@/layout/Header";
import Modal from "@/components/organisms/Modal";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Modal />
      </body>
    </html>
  );
}
