import "./globals.css";

export const metadata = {
  title: "Landrup Dans",
  description: "Landrup dans meld dig til aktiviteter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body className={`font-Ubuntu antialiased scroll-smooth`}>
        {children}
      </body>
    </html>
  );
}
