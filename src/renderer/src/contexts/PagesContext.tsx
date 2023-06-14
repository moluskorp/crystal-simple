import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

interface PagesContextData {
  nextPage: () => void
  previousPage: () => void
  totalPages: number
  activeStep: number
}

interface PagesContextProps {
  children: ReactNode
  totalPages: number
}

const PagesContext = createContext<PagesContextData>({} as PagesContextData)

export function PagesProvider({ children, totalPages }: PagesContextProps) {
  // eslint-disable-next-line
  const [_, setCurrentPage] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  const nextPage = useCallback(() => {
    setCurrentPage((state) => state + 1)
    setActiveStep((state) => state + 1)
  }, [])

  const previousPage = useCallback(() => {
    setCurrentPage((state) => state - 1)
    setActiveStep((state) => state - 1)
  }, [])

  const value = useMemo(
    () => ({ nextPage, totalPages, activeStep, previousPage }),
    [nextPage, totalPages, activeStep, previousPage],
  )

  return <PagesContext.Provider value={value}>{children}</PagesContext.Provider>
}

export function usePages() {
  const context = useContext(PagesContext)

  return context
}
