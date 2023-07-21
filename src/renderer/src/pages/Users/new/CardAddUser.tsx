import { useFormContext } from 'react-hook-form'
import { NewUserFormData } from '.'
import { Box, Card } from '@mui/material'
import { RHFTextField } from '@renderer/components/hook-form'
import { LoadingButton } from '@mui/lab'

export function CardAddUser() {
  const {
    formState: { isSubmitting },
  } = useFormContext<NewUserFormData>()

  return (
    <Card sx={{ p: 3, maxWidth: '600px' }}>
      <Box
        sx={{
          display: 'flex',
          width: '35rem',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <RHFTextField name="name" label="Nome" autoFocus />
        <RHFTextField name="username" label="Usuário" />
        <RHFTextField name="password" label="Senha" type="password" />
        <LoadingButton
          loading={isSubmitting}
          variant="contained"
          type="submit"
          color="success"
          size="large"
        >
          Cadastrar
        </LoadingButton>
      </Box>
    </Card>
  )
}
