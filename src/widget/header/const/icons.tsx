import { FC } from 'react'
import { IconProps, THEME_ICON_MAPPER,  } from '../model/config/config'


export const ThemeIcon: FC<IconProps> = ({ themeKey, ...rest }) => {
    const IconComponent = THEME_ICON_MAPPER[themeKey]
    if (IconComponent) {
        return <IconComponent {...rest} />
    }
    return null
}
