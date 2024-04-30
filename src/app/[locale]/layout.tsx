import type { Metadata } from "next";
import { Providers } from "./providers";
import { NextIntlClientProvider, useMessages } from "next-intl";
// import NavBar from '../components/navBar';

export const metadata: Metadata = {
  title: "Therapist ChatBot",
  description: "Chatbot that is a therapist",
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
