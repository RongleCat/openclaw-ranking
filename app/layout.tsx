import "./globals.css";

export const metadata = {
  title: "OpenClaw 项目排行榜",
  description: "GitHub OpenClaw 相关项目 Star 排行榜",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
