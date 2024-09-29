import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import BackgroundCanvas from '@/components/BackgroundCanvas'
import { LoadingProvider, useLoading } from '../components/LoadingContext';
import { PremiumProvider } from "../components/premiumContext"; 
import { AuthProvider } from '../components/AuthContext'; // Import the new AuthProvider

const AppContent = ({ Component, pageProps }) => {
  const { isLoading } = useLoading();

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
    <AuthProvider> {/* Wrap everything with AuthProvider */}
      <PremiumProvider>
        <LoadingProvider>
          <AppContent Component={Component} pageProps={pageProps} />
        </LoadingProvider>
      </PremiumProvider>
    </AuthProvider>
  );
}

export default MyApp;