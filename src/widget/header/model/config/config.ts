import {
    IconSun,
    IconMoonStars,
    IconWorld,
    TablerIconsProps,
} from '@tabler/icons-react'

export interface IconProps extends TablerIconsProps {
    themeKey: keyof typeof THEME_ICON_MAPPER
}

export const THEME_ICON_MAPPER = {
    sun: IconSun,
    moon: IconMoonStars,
    world: IconWorld,
}