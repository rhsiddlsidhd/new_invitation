import Header from "@/components/layout/Header";
import Modal from "@/components/organisms/modal/Modal";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import ScrollViewBox from "@/components/template/Box/ScrollVIewBox";

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
        <ScrollViewBox height={100}>
          <Footer />
        </ScrollViewBox>
      </body>
    </html>
  );
}
