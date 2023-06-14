import SettingsDrawer from './drawer'
//
import ThemeContrast from './ThemeContrast'
import ThemeRtlLayout from './ThemeRtlLayout'
import ThemeColorPresets from './ThemeColorPresets'
import ThemeLocalization from './ThemeLocalization'
import { ReactNode } from 'react'

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode
}

export default function ThemeSettings({ children }: Props) {
  return (
    <ThemeColorPresets>
      <ThemeContrast>
        <ThemeLocalization>
          <ThemeRtlLayout>
            {children}
            <SettingsDrawer />
          </ThemeRtlLayout>
        </ThemeLocalization>
      </ThemeContrast>
    </ThemeColorPresets>
  )
}
