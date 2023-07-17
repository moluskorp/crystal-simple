import { styled } from '@mui/material'
import { blackA, mauve } from '@radix-ui/colors'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { ReactNode } from 'react'

const SCROLLBAR_SIZE = 10

const ScrollAreaRoot = styled(ScrollArea.Root)({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  '--scrollbar-size': '10px',
})

const ScrollAreaViewport = styled(ScrollArea.Viewport)({
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
})

const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar)({
  display: 'flex',
  userSelect: 'none',
  padding: '2px',
  background: blackA.blackA6,
  transition: 'background 160ms ease-out',
  '&:hover': { background: blackA.blackA8 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
})

const ScrollAreaThumb = styled(ScrollArea.Thumb)({
  flex: 1,
  background: mauve.mauve10,
  borderRadius: SCROLLBAR_SIZE,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
})

const ScrollAreaCorner = styled(ScrollArea.Corner)({
  background: blackA.blackA8,
})

interface Props {
  children: ReactNode
}

export function Scrollbar({ children }: Props) {
  return (
    <ScrollAreaRoot>
      <ScrollAreaViewport>{children}</ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  )
}
