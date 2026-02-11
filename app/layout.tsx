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
    <html lang="zh-CN">
      <body style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-foreground)'
      }}>
        <div style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '2rem 1rem'
        }}>
          {children}
        </div>
      </body>
    </html>
  );
}
