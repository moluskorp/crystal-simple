import Cookies from 'js-cookie'
import {
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useMemo,
} from 'react'
// utils
import getColorPresets, {
  colorPresets,
  defaultPreset,
} from '../utils/getColorPresets'
// config
import {
  defaultSettings as defaultSet,
  cookiesKey,
  cookiesExpires,
} from '../config'
// @type
import {
  ThemeMode,
  ThemeLayout,
  ThemeContrast,
  ThemeDirection,
  ThemeColorPresets,
  SettingsContextProps,
  SettingsValueProps,
} from '../components/settings/type'

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
  ...defaultSet,
  // Mode
  onToggleMode: () => {},
  onChangeMode: () => {},

  // Direction
  onToggleDirection: () => {},
  onChangeDirection: () => {},
  onChangeDirectionByLang: () => {},

  // Layout
  onToggleLayout: () => {},
  onChangeLayout: () => {},

  // Contrast
  onToggleContrast: () => {},
  onChangeContrast: () => {},

  // Color
  onChangeColor: () => {},
  setColor: defaultPreset,
  colorOption: [],

  // Stretch
  onToggleStretch: () => {},

  // Reset
  onResetSetting: () => {},
}

const SettingsContext = createContext(initialState)

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: ReactNode
  defaultSettings: SettingsValueProps
}

function useSettingCookies(
  defaultSettings: SettingsValueProps,
): [SettingsValueProps, Dispatch<SetStateAction<SettingsValueProps>>] {
  const [settings, setSettings] = useState<SettingsValueProps>(defaultSettings)

  const onChangeSetting = () => {
    Cookies.set(cookiesKey.themeMode, settings.themeMode, {
      expires: cookiesExpires,
    })

    Cookies.set(cookiesKey.themeDirection, settings.themeDirection, {
      expires: cookiesExpires,
    })

    Cookies.set(cookiesKey.themeColorPresets, settings.themeColorPresets, {
      expires: cookiesExpires,
    })

    Cookies.set(cookiesKey.themeLayout, settings.themeLayout, {
      expires: cookiesExpires,
    })

    Cookies.set(cookiesKey.themeContrast, settings.themeContrast, {
      expires: cookiesExpires,
    })

    Cookies.set(
      cookiesKey.themeStretch,
      JSON.stringify(settings.themeStretch),
      {
        expires: cookiesExpires,
      },
    )
  }

  useEffect(() => {
    onChangeSetting()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings])

  return [settings, setSettings]
}

function SettingsProvider({
  children,
  defaultSettings,
}: SettingsProviderProps) {
  const [settings, setSettings] = useSettingCookies(defaultSettings)

  const langStorage =
    typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : ''

  const isArabic = langStorage === 'ar'

  // eslint-disable-next-line
  const onChangeDirectionByLang = (lang: string) => {
    setSettings({
      ...settings,
      themeDirection: lang === 'ar' ? 'rtl' : 'ltr',
    })
  }

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang('ar')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArabic])

  // Mode

  // eslint-disable-next-line
  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    })
  }

  // eslint-disable-next-line
  const onChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeMode: (event.target as HTMLInputElement).value as ThemeMode,
    })
  }

  // Direction

  // eslint-disable-next-line
  const onToggleDirection = () => {
    setSettings({
      ...settings,
      themeDirection: settings.themeDirection === 'rtl' ? 'ltr' : 'rtl',
    })
  }

  // eslint-disable-next-line
  const onChangeDirection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeDirection: (event.target as HTMLInputElement)
        .value as ThemeDirection,
    })
  }

  // Layout

  // eslint-disable-next-line
  const onToggleLayout = () => {
    setSettings({
      ...settings,
      themeLayout:
        settings.themeLayout === 'vertical' ? 'horizontal' : 'vertical',
    })
  }

  // eslint-disable-next-line
  const onChangeLayout = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeLayout: (event.target as HTMLInputElement).value as ThemeLayout,
    })
  }

  // Contrast

  // eslint-disable-next-line
  const onToggleContrast = () => {
    setSettings({
      ...settings,
      themeContrast: settings.themeContrast === 'default' ? 'bold' : 'default',
    })
  }

  // eslint-disable-next-line
  const onChangeContrast = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeContrast: (event.target as HTMLInputElement).value as ThemeContrast,
    })
  }

  // Color

  // eslint-disable-next-line
  const onChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeColorPresets: (event.target as HTMLInputElement)
        .value as ThemeColorPresets,
    })
  }

  // Stretch

  // eslint-disable-next-line
  const onToggleStretch = () => {
    setSettings({
      ...settings,
      themeStretch: !settings.themeStretch,
    })
  }

  // Reset

  // eslint-disable-next-line
  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
      themeLayout: initialState.themeLayout,
      themeStretch: initialState.themeStretch,
      themeContrast: initialState.themeContrast,
      themeDirection: initialState.themeDirection,
      themeColorPresets: initialState.themeColorPresets,
    })
  }

  const value = useMemo(
    () => ({
      ...settings,

      // Mode
      onToggleMode,
      onChangeMode,

      // Direction
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,

      // Layout
      onToggleLayout,
      onChangeLayout,

      // Contrast
      onChangeContrast,
      onToggleContrast,

      // Stretch
      onToggleStretch,

      // Color
      onChangeColor,
      setColor: getColorPresets(settings.themeColorPresets),
      colorOption: colorPresets.map((color) => ({
        name: color.name,
        value: color.main,
      })),

      // Reset
      onResetSetting,
    }),
    [
      onResetSetting,
      onToggleContrast,
      onToggleDirection,
      onToggleLayout,
      onToggleMode,
      onToggleStretch,
      onChangeContrast,
      onChangeDirection,
      onChangeDirectionByLang,
      onChangeLayout,
      onChangeMode,
      onChangeColor,
      settings,
    ],
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsProvider, SettingsContext }

// ----------------------------------------------------------------------
