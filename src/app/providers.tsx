"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "@/theme";
import Fonts from "@/theme/fonts";
import { AuthProvider } from "@/context/auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme as chakraTheme } from "@/theme";

const queryClient = new QueryClient();

const muiTheme = createTheme({
  
});
export function Providers({ children }: { children: React.ReactNode }) {
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
      <ThemeProvider theme={muiTheme}>
      <Fonts />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
