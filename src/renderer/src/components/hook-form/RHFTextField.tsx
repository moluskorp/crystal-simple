// form
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import {
  StandardTextFieldProps,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { InputMask } from '../InputMask'

// ----------------------------------------------------------------------

interface IProps extends StandardTextFieldProps {
  name: string
  mask?: any
}

type Props = IProps & TextFieldProps

export default function RHFTextField({ name, mask, ...other }: Props) {
  const { control, watch } = useFormContext()

  let value: null | string = null

  if (mask) {
    value = watch(name)
  }

  if (mask) {
    if (value) {
      return (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputMask
              fullWidth
              mask={mask}
              InputLabelProps={{ shrink: true }}
              error={!!error}
              helperText={error?.message}
              {...field}
              {...other}
              ref={null}
            />
          )}
        />
      )
    }
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <InputMask
            fullWidth
            mask={mask}
            error={!!error}
            helperText={error?.message}
            {...field}
            {...other}
            ref={null}
          />
        )}
      />
    )
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...field}
          {...other}
        />
      )}
    />
  )
}
