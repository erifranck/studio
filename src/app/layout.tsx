import type { Metadata } from 'next';
import { Montserrat, Merriweather } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'CV Forge - Craft Your Perfect Resume',
  description: 'Create, edit, and enhance your CV with AI-powered suggestions, then download as a PDF.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${merriweather.variable} font-serif antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
