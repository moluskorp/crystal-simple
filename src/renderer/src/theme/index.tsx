import {
  ThemeOptions,
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles'
import { ReactNode, useMemo } from 'react'
import { CssBaseline } from '@mui/material'
import useSettings from '../hooks/useSettings'
import breakpoints from './breakpoints'
import palette from './palette'
import shadows, { customShadows } from './shadows'
import typography from './typography'
import componentsOverride from './overrides'

type Props = {
  children: ReactNode
}

export default function ThemeProvider({ children }: Props) {
  const { themeMode, themeDirection } = useSettings()

  const isLight = themeMode === 'light'

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection],
  )

  const theme = createTheme(themeOptions)

  theme.components = componentsOverride(theme)

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
