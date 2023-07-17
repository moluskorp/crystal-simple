// form
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
} from '@mui/material'
import { ReactNode } from 'react'

// ----------------------------------------------------------------------

type IProps = {
  name: string
  children: ReactNode
  disabled?: boolean
  required?: boolean
}

type Props = IProps & SelectProps

export default function RHFSelect({
  name,
  children,
  disabled,
  required,
  ...other
}: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        // @ts-ignore
        <FormControl
          error={!!error}
          disabled={!!disabled}
          required={!!required}
          fullWidth
          sx={other.sx}
        >
          <InputLabel>{other.label}</InputLabel>
          <Select {...field} error={!!error} {...other}>
            {children}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}
