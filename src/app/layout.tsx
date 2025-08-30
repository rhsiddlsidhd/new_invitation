import Header from "@/components/layout/Header";
import Modal from "@/components/organisms/modal/Modal";
import "./globals.css";
import Footer from "@/components/layout/Footer";

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
        <Footer />
      </body>
    </html>
  );
}
