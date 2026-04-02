import "@/app/globals.css";
import localFont from "next/font/local";

const main = localFont({
  src: "./fonts/NotoSansJP-Regular.ttf",
  variable: "--font-main",
});

const main_bold = localFont({
  src: "./fonts/NotoSansJP-Bold.ttf",
  variable: "--font-main-bold",
});

const footer = localFont({
  src: "./fonts/WDXLLubrifontJPN-Regular.ttf",
  variable: "--font-footer",
});

const code = localFont({
  src: "./fonts/CascadiaCode-VariableFont_wght.ttf",
  variable: "--font-code",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${main.variable} ${main_bold.variable} ${footer.variable} ${code.variable}`}
    >
      {children}
    </html>
  );
}

// Runtime will be set by @opennextjs/cloudflare
// export const runtime = 'edge';
