import { MantineProvider } from '@mantine/core'
import { StoreProvider } from './app/provider/store'
import Layout from './shared/ui/layout/layout'

function App() {
    return (
        <StoreProvider>
            <MantineProvider>
                <Layout>Main</Layout>
            </MantineProvider>
        </StoreProvider>
    )
}

export default App
