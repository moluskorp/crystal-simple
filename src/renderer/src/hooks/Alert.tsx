import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import AlertContainer from '../components/AlertContainer'

type AlertType = 'success' | 'error' | 'warning' | 'info'

interface AlertContextData {
  showAlert(message: string, type?: AlertType): void
}

export type ErrorAlert = {
  open: boolean
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData)

interface AlertProviderProps {
  children: React.ReactNode
}

function AlertProvider({ children }: AlertProviderProps) {
  const [errorAlert, setErrorAlert] = useState<ErrorAlert>({
    open: false,
    message: '',
    type: 'error',
  })

  const handleCloseErrorModal = useCallback(() => {
    setErrorAlert({ open: false, message: '', type: 'error' })
  }, [])

  const showAlert = useCallback(
    (message: string, type: AlertType = 'success') => {
      setErrorAlert({ open: true, message, type })
    },
    [],
  )

  const value = useMemo(() => ({ showAlert }), [showAlert])

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertContainer errorAlert={errorAlert} onClose={handleCloseErrorModal} />
    </AlertContext.Provider>
  )
}

function useAlert() {
  const context = useContext(AlertContext)

  if (!context) {
    throw new Error('useAlert must be used within AlertProvider')
  }

  return context
}

export { AlertProvider, useAlert }
