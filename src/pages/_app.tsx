// App.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import BackgroundCanvas from '@/components/BackgroundCanvas'
import { LoadingProvider, useLoading } from '../components/LoadingContext';


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

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LoadingProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </LoadingProvider>
  );
};

export default App;
