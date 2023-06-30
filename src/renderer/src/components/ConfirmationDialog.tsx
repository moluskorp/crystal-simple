import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

interface Props {
  open: boolean
  title: string
  message: string
  setOpen: (value: boolean) => void
  onAccept: () => void
  onRecuse: () => void
}

export function ConfirmationDialog({
  open,
  setOpen,
  title,
  message,
  onAccept,
  onRecuse,
}: Props) {
  function handleClose() {
    setOpen(false)
  }

  function handleAccept() {
    onAccept()
    handleClose()
  }

  function handleRecuse() {
    onRecuse()
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRecuse} color="error">
          Recusar
        </Button>
        <Button onClick={handleAccept}>Aceitar</Button>
      </DialogActions>
    </Dialog>
  )
}
