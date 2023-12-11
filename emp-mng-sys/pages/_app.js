
import '../styles/globals.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import Authprovider from './authProvider'


const queryClient = new QueryClient

function MyApp({ Component, pageProps }) {
  return (

    <Authprovider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </Authprovider>
  )
}

export default MyApp
