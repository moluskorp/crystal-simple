import { Alert, Slide, SlideProps, Snackbar } from '@mui/material'
import { ErrorAlert } from '../hooks/Alert'

interface Props {
  onClose: () => void
  errorAlert: ErrorAlert
}

type TransitionProps = Omit<SlideProps, 'direction'>

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />
}

export default function AlertContainer({ onClose, errorAlert }: Props) {
  return (
    <Snackbar
      open={errorAlert.open}
      autoHideDuration={3000}
      onClose={onClose}
      TransitionComponent={TransitionUp}
    >
      <Alert variant="filled" severity={errorAlert.type}>
        {errorAlert.message}
      </Alert>
    </Snackbar>
  )
}
