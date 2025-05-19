/** @jsxImportSource react */
import React from 'react'; // ✅ <-- Add this line
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/ui/Layout';
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
