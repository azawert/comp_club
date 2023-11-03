import { AppShell } from '@mantine/core'
import { FC, PropsWithChildren } from 'react'
import { Header } from '../../../widget/header'
import { Navbar } from '../../../widget/navbar'

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 125,
                breakpoint: 'sm',
            }}
            padding="md"
        >
            <AppShell.Header>
                <Header />
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Navbar />
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
}

export default Layout
