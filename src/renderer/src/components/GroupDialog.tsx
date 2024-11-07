import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { CardAddGroup } from '@renderer/pages/Groups/new/CardAddGroup'

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  onRegistered: () => void
}

export function GroupDialog({ open, setOpen, onRegistered }: Props) {
  function handleClose() {
    setOpen(false)
  }

  function handleAddGroup() {
    onRegistered()
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Cadastro de grupo'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <CardAddGroup onFinish={handleAddGroup} />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
