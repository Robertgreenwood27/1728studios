import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import BackgroundCanvas from '@/components/BackgroundCanvas'
import { LoadingProvider, useLoading } from '../components/LoadingContext';
import { PremiumProvider } from "../components/premiumContext"; 

const AppContent = ({ Component, pageProps }) => {
  const { isLoading } = useLoading(); // Use inside a child component

  return (
    <>
      <Header />
      <BackgroundCanvas isLoading={isLoading} />
      <Component {...pageProps} />
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PremiumProvider>
      <LoadingProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </LoadingProvider>
    </PremiumProvider>
  );
}

export default MyApp;
