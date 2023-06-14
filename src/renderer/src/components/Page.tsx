import { forwardRef, ReactNode } from 'react'
// @mui
import { Box, BoxProps } from '@mui/material'

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  children: ReactNode
  meta?: ReactNode
  title: string
}

// eslint-disable-next-line
export const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = '', meta, ...other }, ref) => (
    <>
      <head>
        <title>{`${title} | Molter`}</title>
        {meta}
      </head>

      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  ),
)
