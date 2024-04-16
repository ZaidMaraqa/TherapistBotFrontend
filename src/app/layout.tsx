import type { Metadata } from 'next';
import { Providers } from './providers';
import NavBar from '../components/navBar';

export const metadata: Metadata = {
  title: 'Therapist ChatBot',
  description: 'Chatbot that is a therapist',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}