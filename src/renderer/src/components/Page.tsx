import { forwardRef, ReactNode } from 'react'
import useSettings from '@renderer/hooks/useSettings'
// @mui
import { Box, BoxProps, Container } from '@mui/material'

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  children: ReactNode
  meta?: ReactNode
  title: string
}

// eslint-disable-next-line
export const Page = forwardRef<HTMLDivElement, Props>(
  function ({ children, title = '', meta, ...other }, ref){

  const { themeStretch } = useSettings()

  return (
    <>
      <Box ref={ref} {...other}>
        <Container maxWidth={themeStretch ? false : 'lg'}>{children}</Container>
      </Box>
    </>
  )
})
