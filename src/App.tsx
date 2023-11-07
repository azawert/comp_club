import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import 'react-international-phone/style.css'
import { StoreProvider } from './app/provider/store'
import Layout from './shared/ui/layout/layout'
import { AppRouter } from './app/provider/route-provider'

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <MantineProvider>
          <Layout>
            <AppRouter />
          </Layout>
        </MantineProvider>
      </StoreProvider>
    </BrowserRouter>
  )
}

export default App
