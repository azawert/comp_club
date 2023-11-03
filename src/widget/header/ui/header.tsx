import { FC } from 'react'
import {
    Flex,
    Group,
    Image,
    Select,
    Switch,
    useMantineTheme,
    rem,
} from '@mantine/core'
import { LANGUAGES } from '../../../shared/config/i18n/language-constants'
import { ThemeIcon } from '../const/icons'

export const Header: FC = () => {
    const theme = useMantineTheme()

    return (
        <Group h="100%" w="100%" justify="space-between" px="md">
            <Image alt="LOGO" />
            <Flex w="200px" justify="space-between" align="center">
                <Select
                    leftSection={
                        <ThemeIcon
                            themeKey="world"
                            width={rem(16)}
                            height={rem(16)}
                        />
                    }
                    w="50%"
                    defaultValue={LANGUAGES[0]}
                    data={LANGUAGES}
                    allowDeselect={false}
                />
                <Switch
                    size="lg"
                    color="dark.4"
                    onLabel={
                        <ThemeIcon
                            themeKey="sun"
                            color={theme.colors.yellow[4]}
                            width={rem(16)}
                            height={rem(16)}
                        />
                    }
                    offLabel={
                        <ThemeIcon
                            themeKey="moon"
                            color={theme.colors.blue[6]}
                            width={rem(16)}
                            height={rem(16)}
                        />
                    }
                />
            </Flex>
        </Group>
    )
}
