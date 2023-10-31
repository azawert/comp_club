import { MantineProvider } from '@mantine/core'
import { StoreProvider } from './app/provider/store'

function App() {
    return (
        <StoreProvider>
            <MantineProvider>
                <div></div>
            </MantineProvider>
        </StoreProvider>
    )
}

export default App
