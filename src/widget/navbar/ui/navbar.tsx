import { FC } from 'react'
import { ActionIcon, Group, Stack } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'

export const Navbar: FC = () => {
    return (
        <Group w={'100%'} h={'100%'}>
            <Stack justify="flex-end" w={'100%'} h={'100%'} align="center">
                <ActionIcon variant="filled" aria-label="Log out" size="xl">
                    <IconLogout />
                </ActionIcon>
            </Stack>
        </Group>
    )
}
