import { StandardTextFieldProps, TextField } from '@mui/material'
import { IMaskMixin } from 'react-imask'

interface TextFieldMaskProps {
  _unmaskedValue: string
}

interface Props extends StandardTextFieldProps {
  mask?: string
  onAccept?: (value: string, mask: TextFieldMaskProps) => void
}

const InternalMaskTextField = IMaskMixin((props: any) => (
  <TextField {...props} />
))

export function InputMask(props: Props) {
  return <InternalMaskTextField lazy {...(props as any)} />
}
