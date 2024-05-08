import { PageProps } from '@/@types';
import { AuthProvider } from '@/contexts/AuthProvider';
import MainLayout from '@/layouts/MainLayout';
import store from '@/redux/store';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { createTheme } from '@mui/material';
import type { AppProps } from 'next/app';
import { Inter, Roboto_Mono } from 'next/font/google';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
});

const roboto_mono = Roboto_Mono({
  variable: '--font-roboto-mono',
  display: 'swap',
  subsets: ['latin'],
});

type Props = {
  Component: PageProps;
  pageProps: AppProps['pageProps'];
};

const exemptFromLayout: string[] = ['/login', '/redirect'];

export const muiTheme = createTheme({});

export default function App({ Component, pageProps, ...appProps }: Props) {
  return (
    <>
      <NextNProgress
        color="#3D5980"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={false}
        options={{ showSpinner: false }}
      />
      <ChakraProvider
        toastOptions={{
          defaultOptions: {
            position: 'top-right',
            duration: 3000,
          },
        }}
      >
        <Provider store={store}>
          <AuthProvider>
            {exemptFromLayout.includes((appProps as any).router.pathname) ? (
              <Component {...pageProps} />
            ) : (
              <div className={`${inter.variable} ${roboto_mono.variable}`}>
                <MainLayout
                  title={Component.title}
                  metadata={Component.metadata}
                  titleName={Component.titleName}
                  titleNameShown={Component.titleNameShown}
                >
                  <Component {...pageProps} />
                </MainLayout>
              </div>
            )}
          </AuthProvider>
        </Provider>
      </ChakraProvider>
    </>
  );
}
