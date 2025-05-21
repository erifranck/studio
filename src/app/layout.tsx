import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google'; // Changed from Merriweather
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'], // Added more weights if needed
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
      <body className={`${montserrat.variable} font-sans antialiased`}> {/* Removed merriweather */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
