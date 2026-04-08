// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store";
import MainLayout from "@/components/layout/MainLayout";
import { ToastProvider } from "@/components/ui/ToastProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ToastProvider>
    </Provider>
  );
}
