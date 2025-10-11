import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Healthcare Provider Directory',
  description: 'Search and browse healthcare providers with ISR',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
          <h1 style={{ margin: 0 }}>Healthcare Provider Directory</h1>
        </header>
        <main style={{ padding: '1rem' }}>{children}</main>
      </body>
    </html>
  );
}

