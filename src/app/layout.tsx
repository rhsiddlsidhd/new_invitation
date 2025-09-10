// import Header from "@/components/layout/Header";
// import Modal from "@/components/organisms/modal/Modal";
import "./globals.css";

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
        {/* <Modal /> */}
      </body>
    </html>
  );
}
