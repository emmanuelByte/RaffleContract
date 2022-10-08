import { MoralisProvider } from 'react-moralis';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ToastContainer />
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
