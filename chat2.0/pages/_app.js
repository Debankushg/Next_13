import '../styles/globals.css'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'


const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehyratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>

  )
}

export default MyApp
