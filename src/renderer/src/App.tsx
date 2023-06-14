import { Routes } from './Routes'
import NotistackProvider from './components/NotistackProvider'
import ProgressBar from './components/ProgressBar'
import { MotionLazyContainer } from './components/animate'
import { ChartStyle } from './components/chart'
import ThemeSettings from './components/settings'
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext'
import { AlertProvider } from './hooks/Alert'
import ThemeProvider from './theme'

export function App() {
  return (
    <CollapseDrawerProvider>
      <MotionLazyContainer>
        <AlertProvider>
          <ThemeProvider>
            <ThemeSettings>
              <NotistackProvider>
                <ChartStyle />
                <ProgressBar />
                <Routes />
              </NotistackProvider>
            </ThemeSettings>
          </ThemeProvider>
        </AlertProvider>
      </MotionLazyContainer>
    </CollapseDrawerProvider>
  )
}
