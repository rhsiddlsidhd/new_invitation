import Header from "@/components/layout/Header";
import Modal from "@/components/organisms/modal/Modal";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import SnapBox from "@/components/template/Box/SnapBox";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Header /> */}
        {children}
        <Modal />
        <SnapBox>
          <Footer />
        </SnapBox>
      </body>
    </html>
  );
}
