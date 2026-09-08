import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Supta Concierge Service LLC | Luxury 3D Chauffeur & Private Aviation Transfers',
  description: 'Pinnacle executive chauffeur, 2026 Cadillac Escalade ESV Concierge Edition, Maybach S580, and private jet FBO logistics in New York City.',
  keywords: ['Chauffeur New York', 'Luxury Car Booking', 'Cadillac Escalade ESV', 'Maybach S580', 'Airport Transfer', 'Teterboro TEB', 'JFK VIP Transfer'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-obsidian text-gray-100 antialiased selection:bg-gold selection:text-obsidian">
        {children}
      </body>
    </html>
  );
}
