import { Button } from '@mui/material'
import { useAlert } from '@renderer/hooks/Alert'
import Iconify from './Iconify'

type Props = {
  textToCopy: string
}

export function CopyToClipboard({ textToCopy }: Props) {
  const { showAlert } = useAlert()

  function handleCopyToClipboard() {
    const input = document.createElement('input')
    input.value = textToCopy
    document.body.appendChild(input)

    input.select()
    input.setSelectionRange(0, 99999)

    document.execCommand('copy')

    document.body.removeChild(input)
    showAlert('Texto copiado para a área de trasnferência')
  }

  return (
    <Button
      onClick={handleCopyToClipboard}
      sx={{
        px: 0,
        py: 0,
        display: 'flex',
        gap: 1,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {textToCopy}
      <Iconify icon="bi:clipboard" sx={{ marginBottom: 0.5 }} />
    </Button>
  )
}
