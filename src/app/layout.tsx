// src/app/layout.tsx  ← stays a Server Component, no 'use client'
import '../styles/globals.css';
import Providers from '../components/Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
