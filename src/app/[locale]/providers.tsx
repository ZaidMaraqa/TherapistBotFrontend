"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "@/theme";
import Fonts from "@/theme/fonts";
import { AuthProvider } from "@/context/auth";
import { usePathname } from "next/navigation";
import { MainPage } from "@/components/MainPage";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMainPage = pathname === "/en"; 

  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: {
          duration: 3000,
          isClosable: true,
        },
      }}
    >
      <Fonts />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        {isMainPage ? <MainPage /> : children}
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}